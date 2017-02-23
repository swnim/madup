from flask import Blueprint, render_template, redirect, url_for
from server.models import User, db, Affiliate, CampaignAffiliate

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('main/index.html', filename='js/bundle.index.js')


@main.route('/campaigns/<int:campaign_id>')
def get_campaign(campaign_id):
    return render_template('main/index.html', filename='js/bundle.affiliates.js')


@main.route('/users/<name>')
def add_user(name):
    user = User()
    user.name = name
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('main.users'))
