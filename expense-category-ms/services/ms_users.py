import httpx
from fastapi import HTTPException, status

USERS_SERVICE_URL = "http://localhost:3001"

async def get_user_by_id(user_id: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{USERS_SERVICE_URL}/users/{user_id}")
            response.raise_for_status()
            return response.json()

    except httpx.RequestError as e:
        # Si hay un problema de red o el microservicio no está disponible
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
            detail=f"Error connecting to Users service: {str(e)}"
        )

    except httpx.HTTPStatusError as e:
        # Si el microservicio de usuarios devuelve un código de error (ej. 404, 500)
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Users service returned an error: {e.response.text}"
        )
