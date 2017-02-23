from flask import Blueprint, jsonify
from flask import request
from flasgger import swag_from

from server.models import User, Advertiser, Campaign

api = Blueprint('api', __name__)


@api.route('/advertisers')
@swag_from('yml/get_advertisers.yml')
def get_advertisers():
    page_limit = request.args.get('limit')
    page_offest = request.args.get('offset')
    advertisers = Advertiser.query.limit(page_limit).offset(page_offest).all()
    return jsonify([advertiser.to_dict() for advertiser in advertisers])


@api.route('/campaigns')
@swag_from('yml/get_campaigns.yml')
def get_campaigns():
    page_limit = request.args.get('limit')
    page_offest = request.args.get('offset')
    campaigns = Campaign.query.limit(page_limit).offset(page_offest).all()
    return jsonify([campaign.to_dict() for campaign in campaigns])


@api.route('/users')
@swag_from('yml/get_users.yml')
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@api.route('/users/<int:user_id>')
@swag_from('yml/get_user.yml')
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.to_dict())
