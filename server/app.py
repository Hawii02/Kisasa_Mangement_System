from flask import Flask, request, make_response,jsonify
from flask_restful import Api
from flask_migrate import Migrate
from flask_cors import CORS 
from datetime import datetime

from models import db, Client, Transactions, Asset, Holdings, Admin, Account

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

@app.route('/')
def home():
    return '<h1>Welcome to Kisasa Management System"</h1>'

def addAdmin():
    adminData = request.get_json()
    new_admin = Admin(adminname=adminData['adminname'], adminemail=adminData['adminemail'])
    new_admin.password_hash = adminData['password']
    db.session.add(new_admin)
    db.session.commit()
    return make_response({"message": "Admin Created Successfully"}, 201)

@app.route('/login', methods=['POST'])
def loginUser():
    adminData = request.get_json()
  
    target_admin = Admin.query.filter_by(adminname=adminData['username']).first()
    if target_admin is None:
        return make_response({'error': "This admin username does not exist"}, 404)
    if target_admin.authenticate(adminData['password']):
        return make_response({"message": "Welcome to Kisasa Management System, Logged In Successfully"}, 200)
    else:
        return make_response({'error': 'You do not have access rights to this system'}, 403)
    
@app.route('/clients', methods=['GET', 'POST'])
def handle_clients():
    if request.method == 'GET':
        clients = [client.to_dict() for client in Client.query.all()]
        return make_response(jsonify(clients), 200)

    elif request.method == 'POST':
        data = request.get_json()
        existing_client = Client.query.filter_by(email=data['email']).first()
        if existing_client:
            return make_response(jsonify({'message': 'Client already exists'}), 400)

        new_client = Client(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email']
        )
        db.session.add(new_client)
        db.session.commit()
        return make_response(jsonify(new_client.to_dict()), 201)

@app.route('/clients/<int:client_id>', methods=['PUT', 'DELETE'])
def manage_client(client_id):
    client = Client.query.get(client_id)
    if not client:
        return make_response(jsonify({'message': 'Client not found'}), 404)

    if request.method == 'PUT':
        data = request.get_json()
        client.first_name = data.get('first_name', client.first_name)
        client.last_name = data.get('last_name', client.last_name)
        client.email = data.get('email', client.email)
        db.session.commit()
        return make_response(jsonify(client.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(client)
        db.session.commit()
        return make_response(jsonify({'message': 'Client successfully deleted'}), 200)


@app.route('/transactions', methods=['GET', 'POST'])
def transactions():
    if request.method == 'GET':
        transactions = [transaction.to_dict() for transaction in Transactions.query.all()]
        return make_response(jsonify(transactions), 200)
    elif request.method == 'POST':
        data = request.get_json()
        # Check if it's a withdrawal or deposit
        if 'transaction_amount' in data:
            if data['transaction_amount'] < 0:
                transaction_type = 'withdrawal'
            else:
                transaction_type = 'deposit'

            new_transaction = Transactions(
                transaction_type=transaction_type,
                transaction_amount=data['transaction_amount'],
                transaction_date=datetime.utcnow(),
                client_id=data['client_id']
            )
            db.session.add(new_transaction)
            db.session.commit()

            # Update client balance
            client = Client.query.get(data['client_id'])
            if client:
                client.balance += data['transaction_amount']
                db.session.commit()

            return make_response(jsonify(new_transaction.to_dict()), 201)
        else:
            return make_response(jsonify({'message': 'Transaction amount must be provided'}), 400)

@app.route('/transactions/<int:transaction_id>', methods=['GET', 'DELETE'])
def transaction_by_id(transaction_id):
    transaction = Transactions.query.get(transaction_id)
    if not transaction:
        return make_response(jsonify({'message': 'Transaction not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(transaction.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(transaction)
        db.session.commit()

        # Update client balance
        client = Client.query.get(transaction.client_id)
        if client:
            if transaction.transaction_type == 'withdrawal':
                client.balance -= transaction.transaction_amount
            elif transaction.transaction_type == 'deposit':
                client.balance += transaction.transaction_amount
            db.session.commit()

        return make_response(jsonify({'message': 'Transaction successfully deleted'}), 200)



@app.route('/assets', methods=['GET', 'POST'])
def assets():
    if request.method == 'GET':
        assets = [asset.to_dict() for asset in Asset.query.all()]
        return make_response(jsonify(assets), 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_asset = Asset(
            type_of_asset=data['type_of_asset'],
            value=data['value'],
            purchase_price=data['purchase_price'],
            purchase_date=data['purchase_date'],
            client_id=data['client_id']
        )
        db.session.add(new_asset)
        db.session.commit()
        return make_response(jsonify(new_asset.to_dict()), 201)

@app.route('/assets/<int:asset_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def asset_by_id(asset_id):
    asset = Asset.query.get(asset_id)
    if not asset:
        return make_response(jsonify({'message': 'Asset not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(asset.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        asset.type_of_asset = data.get('type_of_asset', asset.type_of_asset)
        asset.value = data.get('value', asset.value)
        asset.purchase_price = data.get('purchase_price', asset.purchase_price)
        asset.purchase_date = data.get('purchase_date', asset.purchase_date)
        asset.client_id = data.get('client_id', asset.client_id)
        db.session.commit()
        return make_response(jsonify(asset.to_dict()), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'type_of_asset' in data:
            asset.type_of_asset = data['type_of_asset']
        if 'value' in data:
            asset.value = data['value']
        if 'purchase_price' in data:
            asset.purchase_price = data['purchase_price']
        if 'purchase_date' in data:
            asset.purchase_date = data['purchase_date']
        if 'client_id' in data:
            asset.client_id = data['client_id']
        db.session.commit()
        return make_response(jsonify(asset.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(asset)
        db.session.commit()
        return make_response(jsonify({'message': 'Asset successfully deleted'}), 200)



@app.route('/holdings', methods=['GET', 'POST'])
def holdings():
    if request.method == 'GET':
        holdings = [holding.to_dict() for holding in Holdings.query.all()]
        return make_response(jsonify(holdings), 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_holding = Holdings(
            number_of_shares=data['number_of_shares'],
            purchase_price=data['purchase_price'],
            purchase_date=data['purchase_date'],
            account_id=data['account_id'],
            asset_id=data['asset_id'],
            client_id=data['client_id']
        )
        db.session.add(new_holding)
        db.session.commit()
        return make_response(jsonify(new_holding.to_dict()), 201)

@app.route('/holdings/<int:holding_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def holding_by_id(holding_id):
    holding = Holdings.query.get(holding_id)
    if not holding:
        return make_response(jsonify({'message': 'Holding not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(holding.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        holding.number_of_shares = data.get('number_of_shares', holding.number_of_shares)
        holding.purchase_price = data.get('purchase_price', holding.purchase_price)
        holding.purchase_date = data.get('purchase_date', holding.purchase_date)
        holding.account_id = data.get('account_id', holding.account_id)
        holding.asset_id = data.get('asset_id', holding.asset_id)
        holding.client_id = data.get('client_id', holding.client_id)
        db.session.commit()
        return make_response(jsonify(holding.to_dict()), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'number_of_shares' in data:
            holding.number_of_shares = data['number_of_shares']
        if 'purchase_price' in data:
            holding.purchase_price = data['purchase_price']
        if 'purchase_date' in data:
            holding.purchase_date = data['purchase_date']
        if 'account_id' in data:
            holding.account_id = data['account_id']
        if 'asset_id' in data:
            holding.asset_id = data['asset_id']
        if 'client_id' in data:
            holding.client_id = data['client_id']
        db.session.commit()
        return make_response(jsonify(holding.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(holding)
        db.session.commit()
        return make_response(jsonify({'message': 'Holding successfully deleted'}), 200)
    
@app.route('/accounts', methods=['GET', 'POST'])
def accounts():
    if request.method == 'GET':
        accounts = [account.to_dict() for account in Account.query.all()]
        return make_response(jsonify(accounts), 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_account = Account(
            account_number=data['account_number'],
            client_id=data['client_id']
        )
        db.session.add(new_account)
        db.session.commit()
        return make_response(jsonify(new_account.to_dict()), 201)

@app.route('/accounts/<int:account_id>', methods=['GET', 'PUT', 'DELETE'])
def account(account_id):
    account = Account.query.get(account_id)
    if not account:
        return make_response(jsonify({'message': 'Account not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(account.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        account.account_number = data.get('account_number', account.account_number)
        account.client_id = data.get('client_id', account.client_id)
        db.session.commit()
        return make_response(jsonify(account.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(account)
        db.session.commit()
        return make_response(jsonify({'message': 'Account successfully deleted'}), 200)

if __name__ == '__main__':
    app.run(port=5556, debug=True)