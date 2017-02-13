from flask import render_template, redirect, url_for
from revenue.main import main
from revenue.models import User, db


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
