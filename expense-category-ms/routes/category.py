from fastapi import APIRouter, HTTPException
from config.db import conn
from models.category import categories
from schemas.category import Category
from sqlalchemy.exc import SQLAlchemyError

category = APIRouter()

@category.get("/categories", tags=["Categories Methods"])
def get_categories():
    result = conn.execute(categories.select()).fetchall()
    categories_list = [dict(row._asdict()) for row in result]
    
    return categories_list

@category.post("/categories", tags=["Categories Methods"])
def create_category(category: Category):
    try:
        new_category = {"name": category.name, "description": category.description}
        result = conn.execute(categories.insert().values(new_category))
        conn.commit()

        #transform -> dict
        last_category = result.lastrowid
        inserted_category = conn.execute(categories.select().where(categories.c.id == last_category)).first()
        inserted_category_dict = dict(inserted_category._asdict())

        return inserted_category_dict
    except SQLAlchemyError as e:
        print(str(e))
        return {"error": str(e)}

@category.get("/categories/{id}", tags=["Categories Methods"])
def get_category_by_id(id: str):
    result = conn.execute(categories.select().where(categories.c.id == id)).first()
    if result is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return dict(result._asdict())

@category.delete("/categories/{id}", tags=["Categories Methods"])
def delete_category(id: str):
    conn.execute(categories.delete().where(categories.c.id == id))
    conn.commit()
    return "deleted"


@category.put("/categories/{id}", tags=["Categories Methods"])
def update_category(id: str, category: Category):
    conn.execute(categories.update().values(
        name = category.name,
        description = category.description
    ).where(categories.c.id == id)
    )
    conn.commit()
    return "updated"

