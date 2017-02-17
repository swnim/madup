from flask import Flask
from flask_restless import APIManager

from server.models import db, User, Campaign
import config


def create_app():
    """flask application generator

    :return: flask application
    """
    app = Flask(__name__)
    config.init_app(app)
    db.init_app(app)

    with app.app_context():
        """ application blueprints """
        from server.main.views import main as main_blueprint
        from server.api.views import api as api_blueprint

        app.register_blueprint(main_blueprint)
        app.register_blueprint(api_blueprint, url_prefix='/api')

        manager = APIManager(app, flask_sqlalchemy_db=db)
        manager.create_api(User, url_prefix='/api/v1', methods=['GET', 'POST'])
        manager.create_api(Campaign, url_prefix='/api/v1', methods=['GET', 'POST'])

    return app
