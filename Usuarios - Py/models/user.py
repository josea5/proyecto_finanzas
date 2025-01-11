from sqlalchemy import Column, Integer, String, Date
from models.db import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    correo = Column(String, unique=True, index=True)  # Correo electrónico único
    nombre = Column(String)  # Nombre del usuario
    pais = Column(String)  # País del usuario
    username = Column(String, unique=True)  # Nombre de usuario único
    fechanacimiento = Column(Date)  # Fecha de nacimiento
    hashed_password = Column(String)  # Contraseña hasheada
