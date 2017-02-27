from flask import Flask
from flasgger import Swagger

from server.models import db, User, Campaign
import config


def create_app():
    """flask application generator

    :return: flask application
    """
    app = Flask(__name__)
    config.init_app(app)
    db.init_app(app)
    Swagger(app)

    with app.app_context():
        """ application blueprints """
        from server.api_1_0.views import api as api_blueprint

        app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
