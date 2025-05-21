from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create a database instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Database Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///waste_data.db'  # or use MySQL/PostgreSQL URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize db with the app
    db.init_app(app)

    return app
