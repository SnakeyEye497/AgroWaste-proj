from .models import WasteListing
from .models import db,User,Transport
from .query import Query
from .waste_and_order import WasteAndOrder 
from db import db

from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Create the db and bcrypt instances here

bcrypt = Bcrypt()
