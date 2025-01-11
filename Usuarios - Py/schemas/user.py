from pydantic import BaseModel
from datetime import date

# Esquema para crear un usuario
class UserCreate(BaseModel):
    correo: str
    nombre: str
    pais: str
    username: str
    fechanacimiento: date
    password: str  

    class Config:
        orm_mode = True

# Esto tendremos cuando pidamos la info de vuelta
class UserOut(BaseModel):
    id: int
    correo: str
    nombre: str
    pais: str
    username: str
    fechanacimiento: date

    class Config:
        orm_mode = True
