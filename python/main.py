# main.py
from flask import Flask
from flask_cors import CORS
from routes import map

app = Flask(__name__)
CORS(app)

app.register_blueprint(map.router)

if __name__ == '__main__':
    app.run(debug=True)
