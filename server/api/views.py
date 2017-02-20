from flask import Blueprint, jsonify
from server.models import User

api = Blueprint('api', __name__)


@api.route('/users')
def users():
    """
    Get a list of users
    ---
    tags:
      - users
    responses:
      200:
        description: Returns a list of users
        schema:
          id: users
          type: array
          items:
            properties:
              id:
                type: integer
                description: The ID of the user
              name:
                type: string
                description: The name of the user
              phone:
                type: string
                description: The phone-number of the user
              avatarUrl:
                type: string
                description: Avatar image URL
    """
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@api.route('/users/<int:user_id>')
def get_user(user_id):
    """
    Get a user
    ---
    tags:
      - users
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
        description: ID of user (type any number)
    responses:
      200:
        description: Returns a user
        schema:
          id: users
          properties:
            id:
              type: integer
              description: The ID of the user
            name:
              type: string
              description: The name of the user
            phone:
              type: string
              description: The phone-number of the user
            avatarUrl:
              type: string
              description: Avatar image URL
    """
    user = User.query.get(user_id)
    return jsonify(user.to_dict())
