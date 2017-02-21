import os


class Config(object):
    DEBUG = False
    TESTING = False
    DEVELOPMENT = False
    CSRF_ENABLED = True
    JSON_AS_ASCII = False
    SECRET_KEY = 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql://root:admin@localhost/madup_db'
    SWAGGER = {
        "swagger_version": "2.0",
        "title": "Flasgger",
        "headers": [
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS"),
            ('Access-Control-Allow-Credentials', "true"),
        ]
    }


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class TestingConfig(Config):
    TESTING = True


def init_app(app):
    app.config.from_object({
        'testing': TestingConfig,
        'production': ProductionConfig,
        'development': DevelopmentConfig,
        'default': DevelopmentConfig
    }[os.getenv('FLASK_CONFIG') or 'default']())