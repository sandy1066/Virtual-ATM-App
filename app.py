import logging
import awsgi
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager

from resources.users import Accounts, UserLogin, ChangePin, Accounts
from resources.transactions import Balance, Deposit, Transaction, Withdrawal, Deposit

logger = logging.getLogger()
logger.setLevel(logging.INFO)

app = Flask(__name__)
cors = CORS(app, origins=["https://itssandeep.me", "https://localhost:4200"], supports_credentials=True)
app.config['JWT_SECRET_KEY'] = "sandy"
api = Api(app)
jwt = JWTManager(app)


api.add_resource(UserLogin, '/login')
api.add_resource(Balance, '/balance')
api.add_resource(ChangePin, '/changepin')
api.add_resource(Withdrawal, '/withdrawal')
api.add_resource(Transaction, '/transfer')
api.add_resource(Deposit, '/deposit')
api.add_resource(Accounts, '/accounts')

def handler(event, context):
    logger.info(event)
    return awsgi.response(app, event, context)

if __name__ == '__main__':
    app.run(debug=True)
