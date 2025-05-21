from db import db
from datetime import datetime

class Query(db.Model):
    __tablename__ = 'queries'

    id = db.Column(db.Integer, primary_key=True)
    farmer_name = db.Column(db.String(100), nullable=False)
    query_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    message = db.Column(db.Text, default='')  # Admin message (initially empty)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
