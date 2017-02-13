from flask import Flask
from revenue.models import db
import config


def create_app():
    """flask application generator

    :return: flask application
    """
    app = Flask(__name__)
    config.init_app(app)
    db.init_app(app)

    """ application blueprints """
    from revenue.main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app