from flask import Flask
from flask_mysql_connector import MySQL
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Change this to your secret key (can be anything, it's for extra protection)
    app.secret_key = 'your secret key'

    # Enter your database connection details below
    app.config['MYSQL_HOST'] = 'db'
    app.config['MYSQL_PORT'] = '3306'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = 'Dd19995678!'
    app.config['MYSQL_DATABASE'] = 'xraylab'
    app.config['SECRET_KEY'] = 'secret key'
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
    app.config['UPLOAD_FOLDER'] = 'C:/Users/user/Downloads'


    # Intialize MySQL
    mysql = MySQL(app)

    return app, mysql

