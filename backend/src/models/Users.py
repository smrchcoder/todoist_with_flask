from database.database import db
class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email= db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'User {self.userId}: {self.name}'
    def to_dict(self):
        return {
            "userId": self.userId,
            "name": self.name,
            "email": self.email
        }
