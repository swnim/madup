from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_method

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(50), nullable=False)
    phone = db.Column(db.Unicode(20), nullable=False)
    avatar_url = db.Column(db.Unicode(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    @hybrid_method
    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            phone=self.phone,
            avatarUrl=self.avatar_url
        )
