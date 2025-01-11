from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.db import engine  # Asegúrate de importar engine desde db.py
from controllers import user as user_api
from models.user import User  # Importa el modelo User

# Crear las tablas en la base de datos
User.metadata.create_all(bind=engine)  # Ahora usar User.metadata, no User.Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mi-dominio.com"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Incluir el router para el controlador de usuarios
app.include_router(user_api.router)
