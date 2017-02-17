from flask import Blueprint, jsonify
from server.models import User

api = Blueprint('api', __name__)


@api.route('/users')
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
