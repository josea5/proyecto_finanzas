from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.db import get_db  
from fastapi.security import OAuth2PasswordRequestForm
from crud import user as crud
from schemas import user as schemas
import security

router = APIRouter()

# Crear un usuario
@router.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, correo=user.correo)
    if db_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username ya registrado")
    return crud.create_user(db=db, user=user)

# Validación de login
@router.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, correo=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = security.create_access_token(data={"sub": user.correo})
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint para enviar a los microservicios
@router.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user