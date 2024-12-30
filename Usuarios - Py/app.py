from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import user
from models.db import engine
from controllers import user as user_api

user.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mi-dominio.com"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(user_api.router)
