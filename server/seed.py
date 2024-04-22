from faker import Faker
from faker.providers import date_time
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from models import db, Admin, TokenBlocklist, Client, Account, Transactions, Asset, Holdings
from datetime import datetime, date
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  
db.init_app(app)
bcrypt = Bcrypt(app)

fake = Faker()
fake.add_provider(date_time)

def clear_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

def create_admin():
    with app.app_context():
        admin = Admin(
            username='admin',
        )
        admin.password_hash = 'adminpassword'  
        db.session.add(admin)
        db.session.commit()

def seed_clients(num_clients=10):
    with app.app_context():
        for _ in range(num_clients):
            client = Client(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
            )
            db.session.add(client)
        db.session.commit()

def seed_accounts(num_accounts=10):
    with app.app_context():
        clients = Client.query.all()
        for _ in range(num_accounts):
            client = fake.random_element(clients)
            account = Account(
                account_number=fake.uuid4(),
                acc_balance=fake.random_number(digits=6),
                client_id=client.id,
                client_name=f'{client.first_name} {client.last_name}'
            )
            db.session.add(account)
        db.session.commit()

def seed_transactions(num_transactions=20):
    with app.app_context():
        accounts = Account.query.all()
        for _ in range(num_transactions):
            account = fake.random_element(accounts)
            transaction = Transactions(
                transaction_type=fake.random_element(elements=('Deposit', 'Withdrawal')),
                transaction_amount=fake.random_number(digits=5),
                transaction_date=fake.date_time_between(start_date='-1y', end_date='now'),
                account_id=account.id,
                client_id=account.client_id,
                client_name=account.client_name
            )
            db.session.add(transaction)
        db.session.commit()

def seed_assets(num_assets=10):
    with app.app_context():
        clients = Client.query.all()
        for _ in range(num_assets):
            client = fake.random_element(clients)
            asset = Asset(
                type_of_asset=fake.random_element(elements=('Stock', 'Bond', 'Real Estate')),
                value=fake.random_number(digits=6),
                purchase_price=fake.random_number(digits=5),
                purchase_date=fake.date_between(start_date='-5y', end_date='now'),
                client_id=client.id
            )
            db.session.add(asset)
        db.session.commit()

def seed_holdings(num_holdings=20):
    with app.app_context():
        accounts = Account.query.all()
        assets = Asset.query.all()
        for _ in range(num_holdings):
            account = fake.random_element(accounts)
            asset = fake.random_element(assets)
            holding = Holdings(
                number_of_shares=fake.random_number(digits=4),
                purchase_price=fake.random_number(digits=5),
                purchase_date=fake.date_between(start_date='-5y', end_date='now'),
                client_name=account.client_name,
                account_id=account.id,
                asset_id=asset.id,
                client_id=account.client_id
            )
            db.session.add(holding)
        db.session.commit()

def seed_all():
    clear_data()
    create_admin()
    seed_clients()
    seed_accounts()
    seed_transactions()
    seed_assets()
    seed_holdings()

if __name__ == '__main__':
    seed_all()