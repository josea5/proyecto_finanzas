from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import String, Integer
from config.db import meta, engine

categories = Table("categories", meta, 
    Column("id", Integer, primary_key=True),
    Column("name", String(255), unique=True),
    Column("description", String(255))
    )

meta.create_all(engine)

