from flask import Flask,  jsonify
from flask_cors import CORS
from routes import tasks_routes, auth_routes
from database.database import db
from flask_jwt_extended import JWTManager
app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Set your JWT secret key
db.init_app(app) # Initialize SQLAlchemy with the Flask app

app.register_blueprint(tasks_routes.tasks_routes_bp)
app.register_blueprint(auth_routes.auth_routes_bp)

#Configuring the JWT manager
jwt = JWTManager(app)

if __name__ == '__main__':
    with app.app_context():
          db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)