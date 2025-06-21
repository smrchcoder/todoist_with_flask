from flask import Flask,  jsonify
from flask_cors import CORS
from routes import tasks_routes
from database.database import db
app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
db.init_app(app) # Initialize SQLAlchemy with the Flask app

app.register_blueprint(tasks_routes.tasks_routes_bp)
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    with app.app_context():
          db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)