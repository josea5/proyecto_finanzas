from fastapi import APIRouter, HTTPException
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
    result = conn.execute(categories.insert().values(new_category))
    conn.commit()
    print(result)
    return ""

@category.get("/category/{id}")
def get_category_by_id():
    pass

@category.delete("/category/{id}")
def delete_category():
    pass
