from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate
from security import get_password_hash

def create_user(db: Session, user: UserCreate):
    db_user = User(
        correo=user.correo,
        nombre=user.nombre,
        pais=user.pais,
        username=user.username,
        fechanacimiento=user.fechanacimiento,
        hashed_password=get_password_hash(user.password)  
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  
    return db_user

def get_user_by_email(db: Session, correo: str):
    return db.query(User).filter(User.correo == correo).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()