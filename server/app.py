from flask import Flask, make_response
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from models import db, Client, Account, Transactions, Asset, Holdings

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

class Home(Resource):
    def get(self):
        welcome_message = {"message": "welcome to Kisasa Management System"}
        return welcome_message

api.add_resource(Home, '/')

class TransactionsResource(Resource):
    def get(self):
        with app.app_context():
            transactions = [transaction.to_dict() for transaction in Transactions.query.all()]
            response = make_response(transactions, 200)
            return response

api.add_resource(TransactionsResource, '/transactions')

class ClientAssets(Resource):
    def get(self):
        with app.app_context():
            assets = [asset.to_dict() for asset in Asset.query.all()]
            response = make_response(assets, 200)
            return response

api.add_resource(ClientAssets, '/assets')

class ClientHoldings(Resource):
    def get(self):
        with app.app_context():
            holdings = [holding.to_dict() for holding in Holdings.query.all()]
            response = make_response(holdings, 200)
            return response

api.add_resource(ClientHoldings, '/holdings')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
