from fastapi import FastAPI
from routes.category import category

app = FastAPI(
    title="Expense Cateory API",
    openapi_tags=[{
        "name" : "Categories Methods"
    }]
    
)

app.include_router(category)