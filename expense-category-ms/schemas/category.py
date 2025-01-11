from pydantic import BaseModel

class Category(BaseModel):
    id : str | None = None
    name: str
    description: str | None = None
