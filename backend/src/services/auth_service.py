from models.Users import User
import bcrypt
from database.database import db
from flask_jwt_extended import create_access_token
from datetime import timedelta
import re

def is_valid_email(email):
    """
    Function to validate email format.
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.fullmatch(pattern, email))

def is_valid_password(password):
    """ 
    Function to validate password strength.
    Password must be at least 8 characters long, contain at least
    """
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    return bool(re.fullmatch(pattern, password))

def registerUser(name:str, email: str, password: str) :
    """
    Function to handle user registration.
    This function should validate the input and create a new user in the database.
    """
    if(is_valid_email(email) == False):
        return {"error": "Invalid email format"}, 400
    if(is_valid_password(password) == False):
        return {"error": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"}, 400
    user = User.query.filter_by(email=email).first()
    if(user):
        return {"error": "User already exists"}, 400
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(name=name, email=email, password=hashed_password.decode('utf-8'))
    try :
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User registered successfully", "user": new_user.__repr__()}, 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 400

def loginUser(email: str, password: str) :
    """
    Function to handle user login.
    This function should validate user credentials and return a token or session.
    """
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"error": "User not found"}, 404
    print(user.to_dict())
    print(password)
    check_password = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
    if not check_password:
        return {"error": "Invalid password"}, 401
    jwt_token = create_access_token(identity=user.email, expires_delta=timedelta(hours=1))
    return {"message": "Login successful", "token": jwt_token}, 200