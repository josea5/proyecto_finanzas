from fastapi import APIRouter, HTTPException, status
from config.db import conn
from models.category import categories
from schemas.category import Category
from sqlalchemy.exc import SQLAlchemyError
from services.ms_users import get_user_by_id

category = APIRouter()

# categories -> tabla SQL
# Category -> Objeto
# category -> router

@category.get("/categories", tags=["Categories Methods"])
def get_categories():
    result = conn.execute(categories.select()).fetchall()
    categories_list = [dict(row._asdict()) for row in result]
    
    return categories_list

@category.post("/categories", tags=["Categories Methods"])
async def create_category(category: Category):
    try:
        user = await get_user_by_id(category.user_id)

        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        new_category = {"name": category.name, "description": category.description, "user_id" : category.user_id}

        result = conn.execute(categories.insert().values(new_category))
        conn.commit()

        #transform -> dict
        last_category = result.lastrowid
        inserted_category = conn.execute(categories.select().where(categories.c.id == last_category)).first()

        #no se deberia de usar(?)
        if inserted_category is None:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error inserting category")
        
        inserted_category_dict = dict(inserted_category._asdict())

        return inserted_category_dict, status.HTTP_201_CREATED
    except SQLAlchemyError as e:
        print(str(e))
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@category.get("/categories/{id}", tags=["Categories Methods"])
def get_category_by_id(id: int):
    result = conn.execute(categories.select().where(categories.c.id == id)).first()
    if result is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return dict(result._asdict())

@category.delete("/categories/{id}", tags=["Categories Methods"])
def delete_category(id: str):
    try:
        result = conn.execute(categories.delete().where(categories.c.id == id))
        conn.commit()
        if result.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")        
        return "deleted"
    except SQLAlchemyError as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")


@category.put("/categories/{id}", tags=["Categories Methods"])
def update_category(id: str, category: Category):
    try:
        result = conn.execute(categories.update().values(
            name = category.name,
            description = category.description
        ).where(categories.c.id == id)
        )
        conn.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

        return {"message": "Category updated", "category": dict(result._asdict())}, status.HTTP_200_OK

    except SQLAlchemyError as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@category.get("/categories/user/{user_id}", tags=["Categories-User Methods"])
def get_categories_by_user_id(user_id: int):
    # Obtener todas las categorías que tengan este user_id
    result = conn.execute(categories.select().where(categories.c.user_id == user_id)).fetchall()
    categories_list = [dict(row._asdict()) for row in result]
    
    if not categories_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No categories found for this user")
    
    return categories_list

@category.delete("/categories/user/{user_id}", tags=["Categories-User Methods"])
def delete_categories_by_user_id(user_id: int):
    try:
        # Eliminar todas las categorías asociadas al user_id
        result = conn.execute(categories.delete().where(categories.c.user_id == user_id))
        conn.commit()
        
        if result.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No categories found for this user")
        
        return {"message": f"Deleted {result.rowcount} categories for user {user_id}"}
    except SQLAlchemyError as e:
        conn.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error deleting categories")
