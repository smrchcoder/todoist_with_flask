from models.tasks import Task
from flask import jsonify
from datetime import datetime
from database.database import db
def create_task(new_task):
    task = Task(title =new_task.get('title'),
                 description=new_task.get('description'),
                 completed=new_task.get('completed', False),
                 expected_completion_date=datetime.fromisoformat(new_task.get('expected_completion_date')),
                 completed_at=new_task.get('completed_at'))
    try: 
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 400  
    return jsonify({"message": "Task created successfully", "task": repr(task)}), 201

def get_tasks():
    tasks = Task.query.all()
    if not tasks:
        return jsonify({"message": "No tasks found"}), 404
    tasks_list = [tasks.to_dict() for tasks in tasks]
    return jsonify(tasks_list), 200
def get_task_by_id(task_id):
    task = Task.query.filter_by(id=task_id).first()
    if not task:
        return jsonify({"message": f'Task with id ${task_id} not found'}), 404
    return jsonify(task.to_dict()), 200
def update_task(task_id, updated_data):
    task = Task.query.filter_by(id=task_id).first()
    if not task:
        return jsonify({"message": f'Task with id {task_id} not found'}), 404
    
    if 'title' in updated_data:
        task.title = updated_data['title']
    if 'description' in updated_data:
        task.description = updated_data['description']
    if 'completed' in updated_data:
        task.completed = updated_data['completed']
    if 'expected_completion_date' in updated_data:
        task.expected_completion_date = datetime.fromisoformat(updated_data['expected_completion_date'])
    if 'completed_at' in updated_data:
        task.completed_at = datetime.fromisoformat(updated_data['completed_at'])
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 400
    
    return jsonify({"message": "Task updated successfully", "task": task.to_dict()}), 200

def delete_task(task_id):
    task = Task.query.filter_by(id=task_id).first()
    if not task:
        return jsonify({"message": f'Task with id {task_id} not found'}), 404
    
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 400
    
    return jsonify({"message": "Task deleted successfully"}), 200