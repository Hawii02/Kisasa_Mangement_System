from flask import Flask, request, make_response,jsonify, render_template
from flask_restful import Api
from flask_migrate import Migrate
from flask_cors import CORS 
import secrets
from datetime import datetime, timedelta

from models import db, Client, Transactions, Asset, Holdings, Admin, Account, TokenBlocklist
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, set_access_cookies, get_jwt_identity

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://kisasa_database_user:GRDsiPwSgdpEnGHTmvSEVcjO9Wix7BJO@dpg-coj1050l5elc73dfb1t0-a.oregon-postgres.render.com/kisasa_database"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = secrets.token_hex(16)  
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False  

db.init_app(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)
api = Api(app)
CORS(app)

@app.route('/api')
@jwt_required()
def home():
    return '<h1>Welcome to Kisasa Management System"</h1>'

@jwt.user_lookup_loader
def find_user_using_token(jwt_header, jwt_data):
    identity = jwt_data['sub']
    user = Admin.query.filter_by(username=identity).one_or_none()
    return user

@app.after_request
def refresh_almost_expired_tokens(response):
    try:
        current_user = get_jwt_identity()
        token = get_jwt()
        original_expiry = token['exp']
        time_now = datetime.utcnow()
        new_expiry = time_now + timedelta(seconds=60)  
        if new_expiry > original_expiry:
            access_token = create_access_token(identity=current_user)
            set_access_cookies(response, access_token)
        return response
    except(RuntimeError, KeyError):
        return response

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    token = jwt_payload['jti']
    target_token = TokenBlocklist.query.filter_by(jti=token).one_or_none()
    return target_token is not None

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    existing_user = Admin.query.filter_by(username=data['username']).first()
    if existing_user:
        return make_response({'error': 'Username already exists'}, 400)

    new_user = Admin(username=data['username'])
    new_user.password_hash = data['password']
    db.session.add(new_user)
    db.session.commit()
    return make_response({"message": "User Created Successfully"}, 201)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Admin.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return make_response({'error': 'Invalid username or password'}, 401)

    access_token = create_access_token(identity=user.username)
    response = make_response({"message": "Logged In Successfully"})
    set_access_cookies(response, access_token)
    return response

@app.route('/api/logout', methods=['POST'])
# @jwt_required()
def logout():
    jti = get_jwt()['jti']
    token_to_block = TokenBlocklist(jti=jti)
    db.session.add(token_to_block)
    db.session.commit()
    return make_response({"message": "Successfully logged out"}, 200)

@app.route('/api/clients', methods=['GET', 'POST'])
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

@app.route('/api/clients/<int:client_id>', methods=['PUT', 'DELETE'])
# @jwt_required()
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


@app.route('/api/transactions', methods=['GET', 'POST'])
# @jwt_required()
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

@app.route('/api/transactions/<int:transaction_id>', methods=['GET', 'DELETE'])
# @jwt_required()
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



@app.route('/api/assets', methods=['GET', 'POST'])
# @jwt_required()
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

@app.route('/api/assets/<int:asset_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
# @jwt_required()
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



@app.route('/api/holdings', methods=['GET', 'POST'])
# @jwt_required()
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

@app.route('/api/holdings/<int:holding_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
# @jwt_required()
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
    
@app.route('/api/accounts', methods=['GET', 'POST'])
# @jwt_required()
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

@app.route('/api/accounts/<int:account_id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required()
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

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5556, debug=True)