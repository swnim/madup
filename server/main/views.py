from flask import Blueprint, render_template, redirect, url_for
from server.models import User, db, Affiliate, CampaignAffiliate

main = Blueprint('main', __name__)


@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def index(path):
    return render_template('main/index.html', filename='js/bundle.index.js')


@main.route('/users/<name>')
def add_user(name):
    user = User()
    user.name = name
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('main.users'))
