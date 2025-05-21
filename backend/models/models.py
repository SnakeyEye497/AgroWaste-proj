from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from db import db





class WasteListing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    price_offered = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    transport_included = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), nullable=False, default='disable')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    farmerName = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f"<WasteListing {self.waste_type}>"



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(100), nullable=True)
    company_description = db.Column(db.Text, nullable=True)
    user_type = db.Column(db.String(10), nullable=False)  # Now storing "farmer", "admin", or "buyer"
 # 0 = farmer, 1 = admin, 2 = buyer
       # 🔥 New password field
    password = db.Column(db.String(200), nullable=False)  # Store hashed password
    
    user_type = db.Column(db.Integer, nullable=False)  # 0 = farmer, 1 = admin, 2 = buyer
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        """Hash and set the user's password."""
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Check the hashed password against the provided password."""
        return bcrypt.check_password_hash(self.password, password)


    def __repr__(self):
          return f"<User {self.name} ({self.email})>"
      



class Transport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    price_offered = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    required_by = db.Column(db.String(20), nullable=False)
    transport_included = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), nullable=False, default='active')
    responses = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Transport {self.waste_type}>"
