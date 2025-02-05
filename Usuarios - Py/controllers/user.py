from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.db import get_db  
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from crud import user as crud
from schemas import user as schemas
from schemas.user import UserOut
import security
from config.config import SECRET_KEY, ALGORITHM
from jose import JWTError, jwt
from services.ms_categories import delete_categories_by_user_id

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
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
    user = crud.get_user_by_username(db, username = form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = security.create_access_token(data={"sub": user.correo})
    return {"access_token": access_token, "token_type": "bearer"}

# Validar token para las otras APIs
@router.get("/validate-token", response_model=UserOut)
def validate_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        # Decodificar el token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")  # El correo electrónico (o ID) del usuario
        if user_email is None:
            raise HTTPException(status_code=403, detail="Token inválido")

        # Obtener el usuario de la base de datos
        user = crud.get_user_by_email(db, correo=user_email)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return user  # Devolver la información del usuario
    except JWTError:
        raise HTTPException(status_code=403, detail="Token inválido o expirado")


@router.delete("/users/{user_id}", response_model=UserOut)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    # 1. Buscar al usuario en la base de datos
    user = crud.get_user_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # 2. Eliminar categorías asociadas al usuario en el microservicio de categorías
    try:
        await delete_categories_by_user_id(user_id)  # Llamada a la función para eliminar categorías
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

    # 3. Eliminar al usuario de la base de datos
    crud.delete_user(db, user_id=user_id)  # Asegúrate de tener un método `delete_user` en tu CRUD

    return user  # Devuelves el usuario eliminado como confirmación

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db,user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user
