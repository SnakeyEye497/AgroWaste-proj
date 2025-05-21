from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from message_sending import whatsapp
from ml_modules.waste_predication import waste_prediction
from models import WasteListing, User, Query,Transport
from models.waste_and_order import FarmerQuery
from datetime import datetime
import os
import sys
from flask_sqlalchemy import SQLAlchemy
from models.waste_and_order import WasteAndOrder
from ml_modules.price_prediction.price_prediction import price_prediction
from ml_modules.waste_predication.waste_prediction import waste_prediction

from db import db


# ✅ Initialize Flask App
app = Flask(__name__)
CORS(app)

# ✅ Database configuration
app.config.from_pyfile('config.py')

# ✅ Initialize Database and Migrate
db.init_app(app)
bcrypt = Bcrypt(app) 
migrate = Migrate(app, db)  # Migrate AFTER db.init_app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///waste_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Add ml_modules directories to the Python path

# Import ML modules
        

@app.route('/api/predict', methods=['POST'])
def predict_waste():
    try:
        data = request.json
        print("📥 Received data:", data)  # Debugging line

        crop_type = data.get('cropType')
        waste_type = data.get('wasteType')
        farm_size = float(data.get('farmSize', 0))

        if not crop_type or not waste_type or farm_size <= 0:
            print("❌ Invalid input data:", data)
            return jsonify({'success': False, 'error': 'Invalid input data'}), 400
        
        predicted_waste = waste_prediction(crop_type, waste_type, farm_size)
        print("✅ Predicted Waste:", predicted_waste)

        return jsonify({'success': True, 'predictedWaste': predicted_waste})

    except Exception as e:
        print("❌ Error in /api/predict:", str(e))  # Debugging line
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/predict_price', methods=['POST'])
def predict_price():
    try:
        data = request.json
        print("Received price prediction data:", data)  # Debugging line

        crop_type = data.get('cropType', '')
        waste_type = data.get('wasteType', '')
        farm_size = float(data.get('farmSize', 0))
        predicted_waste = float(data.get('predictedWaste', 0))

        if not crop_type or not waste_type or farm_size <= 0 or predicted_waste <= 0:
            return jsonify({'success': False, 'error': 'Invalid input data for price prediction'}), 400

        waste_price = price_prediction(crop_type, waste_type, farm_size, predicted_waste)

        return jsonify({'success': True, 'wastePrice': waste_price})

    except Exception as e:
        print("Error:", e)  # Debugging line
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route("/api/save_query", methods=["POST"])
def save_query():
    data = request.json  # Get JSON data from frontend

    # Extract fields
    farmer_name = data.get("farmerName")
    email = data.get("email")
    query_type = data.get("queryType")
    query_description = data.get("queryDescription")

    # Validate input
    if not all([farmer_name, email, query_type, query_description]):
        return jsonify({"error": "All fields are required!"}), 400

    # Create a new query entry
    new_query = FarmerQuery(
        farmer_name=farmer_name,
        email=email,
        query_type=query_type,
        query_description=query_description,
    )

    # Save to database
    try:
        db.session.add(new_query)
        db.session.commit()
        return jsonify({"success": True, "message": "Query submitted successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# ✅ Endpoint to Add Waste Listing
@app.route('/api/add_waste_listing', methods=['POST'])
def add_waste_listing():
    try:
        data = request.json

        # Parse datetime from the string format
        created_at = datetime.strptime(data.get('createdAt'), "%Y-%m-%d") if data.get('createdAt') else datetime.utcnow()


        # Extract data from request
        new_listing = WasteListing(
            waste_type=data.get('waste_type'),
            quantity=float(data.get('quantity')),
            unit=data.get('unit'),
            price_offered=float(data.get('price')),
            location=data.get('location'),
            description=data.get('description', ''),
            transport_included=False,
            status=data.get('status', 'active'),
            created_at=created_at,
            farmerName=data.get('farmerName')
        )

        # Add to the database
        db.session.add(new_listing)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Waste listing added successfully'}), 201

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


### ✅ Endpoint to Fetch All Waste Listings
@app.route('/api/get_waste_listings', methods=['GET'])
def get_waste_listings():
    try:
        listings = WasteListing.query.all()

        result = [
            {
                'id': listing.id,
                'wasteType': listing.waste_type,
                'quantity': listing.quantity,
                'unit': listing.unit,
                'priceOffered': listing.price_offered,
                'location': listing.location,
                'description': listing.description,
                'transportIncluded': listing.transport_included,
                'status': listing.status,
                'createdAt': listing.created_at.strftime("%Y-%m-%d"),
                'farmerName': listing.farmerName
            }
            for listing in listings
        ]

        return jsonify({'success': True, 'listings': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


### ✅ Endpoint to Add User
@app.route('/api/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json

        # Extract data
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        address = data.get('address')
        company_name = data.get('company_name')
        company_description = data.get('company_description', '')
        user_type = data.get('user_type')  # 0 = farmer, 1 = admin, 2 = buyer
        password = data.get('password')

        if not password:
            return jsonify({'success': False, 'error': 'Password is required'}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user instance
        new_user = User(
            name=name,
            phone=phone,
            email=email,
            address=address,
            company_name=company_name,
            company_description=company_description,
            user_type=user_type,
            password=hashed_password
        )

        # Save to DB
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'success': True, 'message': 'User added successfully'}), 201

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


### ✅ Endpoint to Fetch All Users
@app.route('/api/get_users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()

        result = [
            {
                'id': user.id,
                'name': user.name,
                'phone': user.phone,
                'email': user.email,
                'address': user.address,
                'companyName': user.company_name,
                'companyDescription': user.company_description,
                'userType': user.user_type,
                'password' : user.password
            }
            for user in users
        ]

        return jsonify({'success': True, 'users': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


### ✅ Endpoint to Fetch User by Email
@app.route('/api/get_user_by_email/<email>', methods=['GET'])
def get_user_by_email(email):
    try:
        user = User.query.filter_by(email=email).first()

        if user:
            result = {
                'id': user.id,
                'name': user.name,
                'phone': user.phone,
                'email': user.email,
                'address': user.address,
                'companyName': user.company_name,
                'companyDescription': user.company_description,
                'userType': user.user_type,
            }
            return jsonify({'success': True, 'user': result})
        else:
            return jsonify({'success': False, 'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


### ✅ Endpoint to Check User Type and Password
@app.route('/api/check_user_type', methods=['POST'])
def check_user_type():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')  
        user_type = int(data.get('userType'))  # 0 = farmer, 1 = admin, 2 = buyer

        # Find user by email
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            is_match = user.user_type == user_type
            return jsonify({'success': True, 'isMatch': is_match})
        else:
            return jsonify({'success': False, 'error': 'Invalid email or password'}), 401

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/api/post_query', methods=['POST'])
def post_query():
    """
    Endpoint for farmers to post queries.
    """
    try:
        data = request.json

        # Extracting data
        farmer_name = data.get('farmer_name')
        query_title = data.get('query_title')
        description = data.get('description')

        if not all([farmer_name, query_title, description]):
            return jsonify({'success': False, 'error': 'All fields are required'}), 400

        # Create a new query with empty message_box
        new_query = Query(
            farmer_name=farmer_name,
            query_title=query_title,
            description=description,
            message=''  # Empty initially
        )

        # Add to database
        db.session.add(new_query)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Query posted successfully',
            'query_id': new_query.id
        }), 201

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/respond_query/<int:query_id>', methods=['PUT'])
def respond_query(query_id):
    """
    Endpoint for admin to respond to a farmer's query.
    """
    try:
        data = request.json
        message = data.get('message')

        if not message:
            return jsonify({'success': False, 'error': 'Message is required'}), 400

        # Fetch the query by ID
        query = Query.query.get(query_id)

        if not query:
            return jsonify({'success': False, 'error': 'Query not found'}), 404

        # Update the message_box with admin response
        query.message_box = message

        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Query responded successfully',
            'query_id': query.id
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/get_query/<int:query_id>', methods=['GET'])
def get_query(query_id):
    """
    Endpoint for farmers to fetch their query along with admin's response.
    """
    try:
        query = Query.query.get(query_id)

        if not query:
            return jsonify({'success': False, 'error': 'Query not found'}), 404

        result = {
            'id': query.id,
            'farmer_name': query.farmer_name,
            'query_title': query.query_title,
            'description': query.description,
            'message': query.message,
            'created_at': query.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

        return jsonify({'success': True, 'query': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


###  Fetch All WasteAndOrder Records
@app.route('/api/get_waste_orders', methods=['GET'])
def get_waste_orders():
    """Fetch all waste and order records but display only specific columns."""
    try:
       
        waste_orders = WasteAndOrder.query.all()

       
        result = [
            {
                "waste_type": record.waste_type,
                "quantity": record.quantity,
                "price": record.price,
                "unit": record.unit,
                "location": record.location,
                "available_date": record.available_date.strftime("%Y-%m-%d"),
                "description": record.description
            }
            for record in waste_orders
        ]

        return jsonify({'success': True, 'wasteOrders': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route("/update/<int:listing_id>", methods=["POST"])
def update(listing_id):
    listing = WasteListing.query.get(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    listing.status = "pending"  # Change status to active
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "status": listing.status})



@app.route("/update-status/<int:listing_id>", methods=["POST"])
def update_status(listing_id):
    listing = WasteListing.query.get(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    data = request.get_json()
    new_status = data.get("status")

    if new_status not in ["pending", "confirmed", "completed", "cancelled"]:
        return jsonify({"error": "Invalid status"}), 400

    listing.status = new_status
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "status": listing.status})




#get order details 
@app.route('/api/get_order_details/<string:order_id>', methods=['GET'])
def get_order_details(order_id):
    """Fetch specific order details by order_id."""
    try:
        # Query the WasteAndOrder table for the given order_id
        order = WasteAndOrder.query.filter_by(order_id=order_id).first()

        if not order:
            return jsonify({'success': False, 'error': 'Order not found'}), 404

        # Serialize the required fields into a dictionary
        result = {
            "order_id": order.order_id,
            "date_of_order": order.date_of_order.strftime("%Y-%m-%d"),
            "waste_type": order.waste_type,
            "quantity": order.quantity,
            "status": order.status,
            "action": order.action,
        
        }

        return jsonify({'success': True, 'order': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    

    
    
    
    
@app.route("/api/get_farmers_queries", methods=["GET"])
def get_farmers_queries():
    queries = FarmerQuery.query.all()
    queries_list = [
        {
            "id": query.id,
            "farmerName": query.farmer_name,
            "email": query.email,
            "queryType": query.query_type,
            "queryDescription": query.query_description,
        }
        for query in queries
    ]
    return jsonify({"success": True, "queries": queries_list})


    
@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.json
        message_body = data.get('message')

        if not message_body:
            return jsonify({'error': 'Message content is required'}), 400

        # Call WhatsApp function to send the message
        response = whatsapp.whatsapp_message(message_body)

        return jsonify({'success': True, 'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/api/delete')
# def deleteTabledata():
    
#     db.session.query(WasteListing).delete()
#     db.session.commit()

#     return "success"


@app.route('/transport', methods=['GET'])
def get_transports():
    transports = Transport.query.all()
    transport_list = [
        {
            'id': t.id,
            'waste_type': t.waste_type,
            'quantity': t.quantity,
            'unit': t.unit,
            'price_offered': t.price_offered,
            'location': t.location,
            'description': t.description,
            'required_by': t.required_by,
            'transport_included': t.transport_included,
            'status': t.status,
            'responses': t.responses,
            'created_at': t.created_at
        } for t in transports
    ]
    return jsonify(transport_list)

@app.route('/transport_add', methods=['POST'])
def add_transport():
    data = request.get_json()
    new_transport = Transport(
        waste_type=data['waste_type'],
        quantity=data['quantity'],
        unit=data['unit'],
        price_offered=data['price_offered'],
        location=data['location'],
        description=data.get('description', ''),
        required_by=data['required_by'],
        transport_included=data.get('transport_included', False),
        status=data.get('status', 'active'),
        responses=data.get('responses', 0)
    )
    db.session.add(new_transport)
    db.session.commit()
    return jsonify({'message': 'Transport data added successfully!'}), 201

    
    
if __name__ == '__main__':
    app.run(debug=True)
