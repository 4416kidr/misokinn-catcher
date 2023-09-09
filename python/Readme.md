# 前提

python のいくつかパッケージを入れる上で必要なパッケージ管理ツール pip が導入されているのか確認してください．

## 仮想環境の構築

[参考](https://www.python.jp/install/windows/venv.html)

プロジェクトディレクトリを作成後、バックエンド用のディレクトリ（flask_back など）を作成してください。<br/>
その後、バックエンド用のディレクトリで以下のコマンドで仮想環境を作成してください。

```
python -m venv .venv
```

その後、以下のコマンドを実行し、仮想環境に入ってください。

```
.venv\Scripts\activate.bat
```

コマンド プロンプトの先頭に `.venv` と表示され、仮想環境で実行中であることを示します。

## パッケージのインストール

仮想環境内で下記のコマンドを実行し、パッケージのインストールしてください

```
python -m pip install -r requirements.txt
```

## DB

MySQL を用いています。以下のサイトの手順通りにインストールしてください<br/>
[windows の方](https://prog-8.com/docs/mysql-env-win)<br/>
[mac の方](https://prog-8.com/docs/mysql-env)

### テストデータ作成

MySQL の root ユーザにログイン

```
mysql --user=root --password
```

下記コマンドでデータベース`seven_eleven`を作成し、選択。

```
CREATE DATABASE seven_eleven;
USE seven_eleven;
```

テーブル`reviews`,`location`,`stock_status` を作成します。

- location テーブル<br/>
  店舗の位置情報を緯度経度で管理
- reviews テーブル<br/>
  レビューを管理。店舗が選択されたときに表示する。
- stock_status テーブル<br/>
  当該店舗がルート選択できるかどうかを管理する。（最新の投稿で在庫情報が 0 であれば選択できないようにする。）

### location テーブル作成

```
CREATE TABLE location (
    id INT NOT NULL AUTO_INCREMENT,
    lat DOUBLE NOT NULL,
    lon DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
```

```
INSERT INTO location (lat, lon) VALUES
(35.6895, 139.6917),
(34.6937, 135.5023),
(35.6895, 139.6917),
(43.0621, 141.3544),
(35.0116, 135.7681),
(34.3853, 132.4553),
(33.5902, 130.4017),
(35.4437, 139.6380),
(38.2682, 140.8694),
(34.6695, 135.4930);
```

### reviews テーブル作成

```
CREATE TABLE reviews (
    reviews_id INT PRIMARY KEY,
    store_id INT,
    stock INT,
    post_time DATETIME,
    review TEXT
);
```

```
INSERT INTO reviews (reviews_id, store_id, stock, post_time, review) VALUES
(1, 1, 0, '2023-09-08 10:00:00', '素晴らしい商品です！'),
(2, 2, 1, '2023-09-08 10:05:00', '普通の体験でした。'),
(3, 3, 2, '2023-09-08 10:10:00', '品質に満足していません。'),
(4, 4, 0, '2023-09-08 10:15:00', 'サービスがとても良い！'),
(5, 5, 1, '2023-09-08 10:20:00', 'また利用したいです。'),
(6, 6, 2, '2023-09-08 10:25:00', '価格に見合った品質だと思います。'),
(7, 7, 0, '2023-09-08 10:30:00', '期待以上の商品でした。'),
(8, 8, 1, '2023-09-08 10:35:00', '配送が早くて助かりました。'),
(9, 9, 2, '2023-09-08 10:40:00', '商品の説明と異なる部分がありました。'),
(10, 10, 0, '2023-09-08 10:45:00', 'サポートが非常に親切でした。'),
(11, 7, 0, '2023-09-08 11:00:00', '全体的に満足しています。');
```

### stock_status テーブル作成

必ず先に reviews テーブルを作成してください。

```
CREATE TABLE stock_status (
    store_id INT PRIMARY KEY,
    latest_stock INT,
    post_time DATETIME
);
```

日本語サポート

```
ALTER TABLE Reviews MODIFY review TEXT CHARACTER SET utf8mb4;
```

```
INSERT INTO stock_status (store_id, latest_stock, post_time)
SELECT r.store_id, r.stock, r.post_time
FROM reviews r
JOIN (
    SELECT store_id, MAX(post_time) as latest_time
    FROM reviews
    GROUP BY store_id
) subq ON r.store_id = subq.store_id AND r.post_time = subq.latest_time
ON DUPLICATE KEY UPDATE
    latest_stock = VALUES(latest_stock),
    post_time = VALUES(post_time);
```

## 接続したい DB への情報

/config/env.py に接続したい DB への接続情報を乗せています。ユーザー名とパスワードを自身のものに変更してください。
