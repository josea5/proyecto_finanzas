from fastapi import FastAPI
from routes.category import category
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Expense Cateory API",
    openapi_tags=[{
        "name" : "Categories Methods"
    }]
    
)

origins = [
    #microservicio users link:
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solicitudes de estos orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir cualquier método (GET, POST, etc.)
    allow_headers=["*"],  # Permitir cualquier encabezado
)

app.include_router(category)