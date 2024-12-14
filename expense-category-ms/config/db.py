from sqlalchemy import create_engine, MetaData

DATABASE_URL = "mysql+pymysql://root:pass@localhost:3306/db_categories"

engine = create_engine(DATABASE_URL)
meta = MetaData()
conn = engine.connect()

#docker run --name mysql-categories -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_USER=josea5 -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=db_categories -p 3306:3306 -d mysql:latest
#docker run -d --rm --name mysql-categories -e MYSQL_ROOT_PASSWORD=pass -p 3306:3306 -v mysql_data:/var/lib/mysql mysql:8.0
#docker exec -it mysql-categories mysql -u root -p
