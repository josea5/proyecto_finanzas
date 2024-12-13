from pydantic import BaseModel
from typing import Optional

class Category(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
