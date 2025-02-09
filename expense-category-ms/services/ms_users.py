import httpx
from fastapi import HTTPException, status


async def get_user_by_id(user_id: int):
    # URL de la API de usuarios (reemplazar con la URL y puerto de tu microservicio de usuarios)
    url = f"http://localhost:3001/users/{user_id}"

    async with httpx.AsyncClient() as client:
        try:
            # Hacer la solicitud GET al microservicio de usuarios
            response = await client.get(url)

            # Si el código de respuesta es 200, el usuario existe
            if response.status_code == 200:
                return response.json()
            else:
                # Si no encuentra el usuario, retorna None
                return None
        except httpx.RequestError as e:
            # Manejo de errores si no se puede conectar a la API
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Error de conexión con el servicio de usuarios: {str(e)}")