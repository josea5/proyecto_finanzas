from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import String
from config.db import meta, engine

categories = Table("categories", meta, 
    Column("name", String(255), primary_key= True),
    Column("description", String(255))
    )

meta.create_all(engine)

