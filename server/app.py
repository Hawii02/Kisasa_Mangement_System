from flask import Flask, make_response
from flask_restful import Api, Resource
from flask_migrate import Migrate
from models import db, Transactions, Assets, Holdings
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact=False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
CORS(app)

class Home(Resource):
    def get(self):
        welcome_message = {"message": "welcome to my app"}
        return welcome_message

api.add_resource(Home, '/')

class TransactionsResource(Resource):
    def get(self):
        transactions = [transactions.to_dict() for transactions in Transactions.query.all()]
        response = make_response(transactions, 200)
        return response

api.add_resource(TransactionsResource, '/transactions')


class ClientAssets(Resource):
    def get(self):
        assets=[asset.to_dict() for asset in Assets.query.all()]
        response=make_response(assets, 201)
        return response
    
api.add_resource(ClientAssets, '/assets')

class ClientHoldings(Resource):
    def get(self):
        client_holdings=[holding.to_dict() for holding in Holdings.query.all()]
        response= make_response(client_holdings, 200)
        return response
    
api.add_resource(ClientHoldings, '/holdings')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
