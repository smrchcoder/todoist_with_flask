from flask import Blueprint, request, jsonify
from services import auth_service
from flask_jwt_extended import jwt_required, get_jwt_identity
auth_routes_bp = Blueprint('auth_routes', __name__)

@auth_routes_bp.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()
    if not login_data:
        return jsonify({'error': 'Invalid input'}), 400
    email = login_data.get('email')
    password = login_data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    return auth_service.loginUser(email, password)

@auth_routes_bp.route('/register', methods=['POST'])
def register():
    registeration_data = request.get_json()
    if not registeration_data:
        return jsonify({'error': 'Invalid input'}), 400
    name = registeration_data.get('name')
    email = registeration_data.get('email')
    password = registeration_data.get('password')
    confirm_password = registeration_data.get('confirm_password')
    if not name or not email or not password or not confirm_password:
        return jsonify({'error': 'All fields are required'}), 400
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400
    
    return auth_service.registerUser(name, email, password)

@auth_routes_bp.route('/logout', methods=['POST'])
@jwt_required()
#TO be implemented later
def logout():
    current_user_email = get_jwt_identity()
    pass



