import httpx
from fastapi import HTTPException

CATEGORIES_SERVICE_URL = "http://localhost:8002"  # Cambia esta URL a la correcta

async def delete_categories_by_user_id(user_id: int):
    async with httpx.AsyncClient() as client:
        try:
            # Llamamos al endpoint DELETE en el microservicio de categorías para eliminar todas las categorías
            response = await client.delete(f"{CATEGORIES_SERVICE_URL}/categories/user/{user_id}")
            response.raise_for_status()  # Lanza un error si el código de estado no es 2xx
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error al eliminar categorías: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error en categorías: {e.response.text}")
