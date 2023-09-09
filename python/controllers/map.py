from mysql import connection

#導入する関数、処理を定義する


def get_all_reviews():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Reviews")
    reviews = cursor.fetchall()
    cursor.close()
    connection.close()
    return reviews