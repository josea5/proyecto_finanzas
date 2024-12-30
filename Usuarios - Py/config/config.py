import os
from dotenv import load_dotenv

# Sirve para cargar las variables de entorno desde un archivo .env
load_dotenv()

# Configuracion para conectarnos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://usuario:contrasena@localhost/dbname")

# Clave secreta para JWT
SECRET_KEY = os.getenv("SECRET_KEY", "mysecretkey")
ALGORITHM = "HS256" #El tipo de algoritmo para encriptar
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Esto es los minutos para que se expire el token
