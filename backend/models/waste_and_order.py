from datetime import datetime
from . import db

class WasteAndOrder(db.Model):
    __tablename__ = 'waste_and_order'

    id = db.Column(db.Integer, primary_key=True)  # Unique ID
    waste_type = db.Column(db.String(100), nullable=False)     # Waste type
    quantity = db.Column(db.Float, nullable=False)             # Quantity
    price = db.Column(db.Float, nullable=False)                # Price per unit
    unit = db.Column(db.String(20), nullable=False)            # Unit (kg, ton, etc.)
    location = db.Column(db.String(200), nullable=False)       # Location of waste
    available_date = db.Column(db.DateTime, nullable=False)    # Available date
    description = db.Column(db.Text, nullable=True)            # Description
    order_id = db.Column(db.String(50), unique=True, nullable=False)  # Order ID
    # date_of_order = db.Column(db.DateTime, default=datetime.utcnow)  # Date of order
    status = db.Column(db.String(50), default='pending')       # Status (pending, completed, canceled)
    # action = db.Column(db.String(100), nullable=True)          # Admin action (approve, reject, etc.)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    def __repr__(self):
        return f"<WasteAndOrder {self.order_id}>"
    

class FarmerQuery(db.Model):
    __tablename__ = "farmer_queries"  # Optional: Define a table name explicitly

    id = db.Column(db.Integer, primary_key=True)
    farmer_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    query_type = db.Column(db.String(50), nullable=False)
    query_description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<FarmerQuery {self.farmer_name} - {self.query_type}>"
