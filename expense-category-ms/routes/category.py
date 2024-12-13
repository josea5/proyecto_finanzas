from fastapi import APIRouter
from config.db import conn
from models.category import categories
from schemas.category import Category

category = APIRouter()

@category.get("/categories")
def get_categories():
    return conn.execute(categories.select()).fetchall()

@category.post("/categories")
def create_category(category: Category):
    new_category = {"name": category.name, "description": category.description}
    print(category)
    return {"message": "Category created", "category": new_category}