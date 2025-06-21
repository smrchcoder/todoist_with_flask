
from flask import Blueprint, request, jsonify
import services.tasks_service as tasks_service
tasks_routes_bp = Blueprint('tasks_routes', __name__)

@tasks_routes_bp.route('/create_task', methods=['POST'])
def create_task():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400
    print(f"Received data: {data}")
    return tasks_service.create_task(data)

@tasks_routes_bp.route('/get_tasks', methods=['GET'])
def get_tasks():
    return tasks_service.get_tasks()

@tasks_routes_bp.route('/get_task/<int:task_id>', methods=['GET'])
def get_task_by_id(task_id):
    return tasks_service.get_task_by_id(task_id)

@tasks_routes_bp.route('/update_task/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400
    return tasks_service.update_task(task_id, data)

@tasks_routes_bp.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    return tasks_service.delete_task(task_id)