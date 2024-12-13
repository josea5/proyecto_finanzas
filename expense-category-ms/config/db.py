from sqlalchemy import create_engine, MetaData

DATABASE_URL = "mysql+pymysql://josea5:pass@localhost:3306/db_categories"

engine = create_engine(DATABASE_URL)
meta = MetaData()
conn = engine.connect()

#docker run --name mysql-categories -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_USER=josea5 -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=db_categories -p 3306:3306 -d mysql:latest
#docker exec -it mysql-categories mysql -u josea5 -p
