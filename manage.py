from flask_debugtoolbar import DebugToolbarExtension
from flask_script import Manager
from server import create_app

app = create_app()
manager = Manager(app)
toolbar = DebugToolbarExtension(app)

if __name__ == '__main__':
    manager.run()
