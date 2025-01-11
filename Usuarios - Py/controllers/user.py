from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, security
from models.db import get_db
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

# Aca se crea un usuario
@router.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, correo=user.correo)
    if db_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username ya registrado")
    return crud.create_user(db=db, user=user)

# Aca se valida el logueo
@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, correo=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = security.create_access_token(data={"sub": user.correo})
    return {"access_token": access_token, "token_type": "bearer"}
