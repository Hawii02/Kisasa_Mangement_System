from flask import Flask, request, make_response,jsonify
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token,get_jwt_identity,JWTManager,jwt_required

from models import db, Client, Account, Transactions, Asset, Holdings, Admin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

class Home(Resource):
    def get(self):
        return "Welcome to Kisasa Management System"
api.add_resource(Home, "/")

class SignUp(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        adminname = data.get("adminname")
        password = str(data.get("password"))
        email = str(data.get("email"))
        print(f"{data} admin Created Successfully")

        #check if user exists
        user_exists = Admin.query.filter(Admin.adminname == adminname)

        hashed_password = bcrypt.generate_password_hash(password)
        access_token = create_access_token(identity = adminname)

        new_user = Admin (
            username = adminname,
            email = email,
            password = hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id":"new_user.id",
            "username":"new_user.username",
            "email":"new_user.email",
            "access_token":access_token
        })
    
api.add_resource(SignUp,"/user/signup") 

class Login(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        username = data.get("username")
        email = data.get("email")
        password = str(data.get("password"))

        admin = Admin.query.filter_by(username=username).first()
        
        if admin and email is None:
            return  make_response(jsonify({"error":"Unauthorized, incorrect username and name"}),401)
        
        if not bcrypt.check_password_hash(admin.password,password):
            return make_response(jsonify({"error": "Unauthorized incorrect password"}), 401)
           
        access_token = create_access_token(identity=username)
        
        admin.access_token = access_token
        
        return jsonify({
            "id":"user.id",
            "username":"user.username",
            "email":"user.email",
            "access_token": "access_token",
            "message":"login successful"
        
        })
        
api.add_resource(Login,"/admin/login")    

class Clients(Resource):
    def get(self):
        clients = [client.to_dict() for client in Client.query.all()]
        return make_response(clients,200)
    
api.add_resource(Clients,"/clients")   

class ClientById(Resource):
    def get(self,id):
        client = Client.query.filter(Client.id==id).first()
        if client:
            return make_response(jsonify(client.to_dict()),200)
        else:
            return make_response(jsonify({"error":"Client not found."}))
    
    def patch(self, id):
        data = request.get_json()
        client = Client.query.filter(Client.id==id).first()

        for attr in data:
            setattr(client, attr, data.get(attr))
        db.session.add(client)
        db.session.commit()

        return make_response(client.to_dict(), 200)
    
    def delete(self, id):
        client = Client.query.filter(Client.id == id).first()
        if client:
            db.session.delete(client)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error":"Client not found"}))
api.add_resource(ClientById, "/clients/<int:id>")

    
# Assets
class Assets(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        type_of_asset = data.get("type_of_asset")
        value = data.get("value")
        purchase_price = data.get("purchase_price")
        purchase_date = data.get("purchase_date")
        client_id = data.get("client_id")
        print(f"{data} Created Successfully")

        new_asset = Asset (
            type_of_asset = type_of_asset,
            value = value,
            purchase_price = purchase_price,
            purchase_date = purchase_date,
            client_id = client_id,
        )
        db.session.add(new_asset)
        db.session.commit()

        return jsonify({
            "id":"new_asset.id",
            "type_of_asset":"new_asset.type_of_asset",
            "value":"new_asset.value",
            "purchase_price": "new_asset.purchase_price",
            "purchase_date": "new_asset.purchase_date",
            "client_id": "new_asset.client_id",
        })
    
    def get(self):
        assets = [asset.to_dict()for asset in Asset.query.all()]
        return make_response(assets, 200)
    
api.add_resource(Assets, "/assets")

class AssetByID(Resource):
    def get(self, id):
        asset = Asset.query.filter(Asset.id == id).first()
        if asset:
            return make_response(jsonify(asset.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Asset not found"}))
    
    def patch(self, id):
        data = request.get_json()
        asset = Asset.query.filter(Asset.id == id).first()
        for attr in data:
            setattr(asset, attr, data.get(attr))
        
        db.session.add(asset)
        db.session.commit
        
        return make_response(asset.to_dict(), 200)
    
    def delete(self, id):
        asset = Asset.query.filter(Asset.id == id).first()
        if asset:
            db.session.delete(asset)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error":"asset not found"}), 404)
api.add_resource(AssetByID, "/assets/<int:id>")


# Holdings
class Holding(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        number_of_shares = data.get("number_of_shares")
        purchase_price = data.get("purchase_price")
        purchase_date = data.get("purchase_date")
        account_id = data.get("account_id")
        asset_id = data.get("asset_id")
        client_id = data.get("client_id")
        print(f"{data} Created Successfully")

        new_holding = Holdings (
            number_of_shares = number_of_shares,
            purchase_price = purchase_price,
            purchase_date = purchase_date,
            account_id = account_id,
            asset_id = asset_id,
            client_id = client_id,
        )
        db.session.add(new_holding)
        db.session.commit()

        return jsonify({
                "number_of_shares": "new_holding.number_of_shares",
                "purchase_price": "new_holding.purchase_price",
                "purchase_date": "new_holding.purchase_date",
                "account_id": "new_holding.account_id",
                "asset_id": "new_holding.asset_id",
                "client_id": "new_holding.client_id",
        })
    
    def get(self):
        holdings = [holding.to_dict()for holding in Holdings.query.all()]
        return make_response(holdings, 200)
    
api.add_resource(Holding, "/holdings")

class HoldingsByID(Resource):
    def get(self, id):
        holdings = Holdings.query.filter(Holdings.id == id).first()
        if holdings:
            return make_response(jsonify(holdings.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "holdings not found"}))
    
    def patch(self, id):
        data = request.get_json()
        holdings = Holdings.query.filter(Holdings.id == id).first()
        for attr in data:
            setattr(holdings, attr, data.get(attr))
        
        db.session.add(holdings)
        db.session.commit
        
        return make_response(holdings.to_dict(), 200)
    
    def delete(self, id):
        holdings = Holdings.query.filter(Holdings.id == id).first()
        if holdings:
            db.session.delete(holdings)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error":"holdings not found"}), 404)
api.add_resource(HoldingsByID, "/holdings/<int:id>")

    
# Account
class Accounts(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        account_number = data.get("number_of_shares")
        account_balance = data.get("purchase_price")
        client_id = data.get("client_id")
        client_name = data.get("client_name")
        print(f"{data} Created Successfully")

        new_account = Account (
            account_number = account_number,
            account_balance = account_balance,
            client_id = client_id,
            client_name = client_name,
        )
        db.session.add(new_account)
        db.session.commit()

        return jsonify({
                "account_number": "new_account.account_number",
                "account_balance": "new_account.account_balance",
                "client_id": "new_account.client_id",
                "client_name": "new_account.client_name",
        })
    
    def get(self):
        account = [account.to_dict()for account in Account.query.all()]
        return make_response(account, 200)
    
api.add_resource(Accounts, "/account")


class AccountByID(Resource):
    def get(self, id):
        account = Account.query.filter(Account.id == id).first()
        if account:
            return make_response(jsonify(account.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "account not found"}))
    
    def patch(self, id):
        data = request.get_json()
        account = Account.query.filter(Account.id == id).first()
        for attr in data:
            setattr(account, attr, data.get(attr))
        
        db.session.add(account)
        db.session.commit
        
        return make_response(account.to_dict(), 200)
    
    def delete(self, id):
        account = Account.query.filter(Account.id == id).first()
        if account:
            db.session.delete(account)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error":"account not found"}), 404)
api.add_resource(AccountByID, "/account/<int:id>")


#  Transactions

class Transaction(Resource):
    def post(self):
        data = request.get_json()[0]
        print(data)
        transaction_type= data.get("transaction_type")
        transaction_amount = data.get("transaction_amount")
        transaction_date = data.get("transaction_date")
        client_id = data.get("client_id")
        account_id = data.get("account_id")
        print(f"{data} Created Successfully")

        new_transaction = Transactions (
            transaction_type = transaction_type,
            transaction_amount = transaction_amount,
            transaction_date = transaction_date,
            account_id = account_id,
            client_id = client_id,
        )
        db.session.add(new_transaction)
        db.session.commit()

        return jsonify({
                "transaction_type": "new_transaction.transaction_type",
                "transaction_amount": "new_transaction.transaction_amount",
                "transaction_date": "new_transaction.transaction_date",
                "account_id": "new_transaction.account_id",
                "client_id": "new_transaction.client_id",
        })
    
    def get(self):
        transactions = [transactions.to_dict()for transactions in Transactions.query.all()]
        return make_response(transactions, 200)
    
api.add_resource(Transaction, "/transactions")

class TransactionsByID(Resource):
    def get(self, id):
        transactions = Transactions.query.filter(Transactions.id == id).first()
        if transactions:
            return make_response(jsonify(transactions.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "transactions not found"}))
    
    def patch(self, id):
        data = request.get_json()
        transactions = Transactions.query.filter(Transactions.id == id).first()
        for attr in data:
            setattr(transactions, attr, data.get(attr))
        
        db.session.add(transactions)
        db.session.commit
        
        return make_response(transactions.to_dict(), 200)
    
    def delete(self, id):
        transactions = Transactions.query.filter(Transactions.id == id).first()
        if transactions:
            db.session.delete(transactions)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error":"transactions not found"}), 404)
api.add_resource(TransactionsByID, "/transactions/<int:id>")       
        
 
if __name__ == '__main__':
    app.run(port=5555, debug=True)


