from mysql import connection

#導入する関数、処理を定義する


# def get_all_reviews():
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM Reviews")
#     reviews = cursor.fetchall()
#     # cursor.close()
#     connection.close()
#     return reviews

# 全店舗の位置情報取得
def get_locations():
    cursor = connection.cursor()
    sql = f"SELECT * FROM location " 
    cursor.execute(sql)
    stores = cursor.fetchall()
    cursor.close()
    return stores

# 指定された1店舗の口コミ取得
def get_review(store_id: int):
    cursor = connection.cursor()
    sql = "SELECT * FROM Reviews WHERE store_id = %s"
    cursor.execute(sql, (store_id,))
    review = cursor.fetchall()
    cursor.close()
    return review

#在庫情報の取得
def get_stock_info():
    cursor = connection.cursor()
    sql = """
    SELECT r1.*
    FROM Reviews r1
    JOIN (
        SELECT store_id, MAX(post_time) as latest_post_time
        FROM Reviews
        GROUP BY store_id
    ) r2
    ON r1.store_id = r2.store_id AND r1.post_time = r2.latest_post_time;
    """

    cursor.execute(sql)
    stock_info = cursor.fetchall()
    cursor.close()
    return stock_info

#口コミの投稿
def add_review(store_id: int, stock: int, post_time: str, review: str):
    cursor = connection.cursor()
    sql = "INSERT INTO Reviews (store_id, stock, post_time, review) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (store_id, stock, post_time, review))
    connection.commit() 
    cursor.close()


