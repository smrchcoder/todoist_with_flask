from database.database import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    expected_completion_date = db.Column(db.DateTime, nullable=True)
    completed_at = db.Column(db.DateTime, server_default=db.func.now())
    #Represensts the task model in the database , this is seen whenever  debuggeer class this
    def __repr__(self):
        return f'<Task {self.id}: {self.title}>'
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "expected_completion_date": self.expected_completion_date.isoformat() if self.expected_completion_date else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None
        }
