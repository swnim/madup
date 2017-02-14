from flask import render_template, redirect, url_for, jsonify
from revenue.main import main
from revenue.models import User, db


@main.route('/')
def index():
    return render_template('main/index.html')


@main.route('/users')
def users():
    users = User.query.all()
    return render_template('main/users.html', users=users)


@main.route('/users/<name>')
def add_user(name):
    user = User()
    user.name = name
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('main.users'))


@main.route('/api/users')
def api_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])