from config import env
import pymysql.cursors


# データベースに接続

connection = pymysql.connect(
        host=env.DB_HOST,
        user=env.DB_USER,
        password=env.DB_PASSWORD,
        database=env.DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )