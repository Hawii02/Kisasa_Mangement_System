from datetime import datetime
from app import app
from faker import Faker
from models import db, Client, Account, Transactions, Asset, Holdings
import random

fake = Faker()

# Function to generate random client data
def generate_client_data():
    clients_data = []
    for _ in range(5):  # Generate 5 clients
        client_data = {
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'email': fake.email()
        }
        clients_data.append(client_data)
    return clients_data

# Function to generate random account data
def generate_account_data(clients):
    accounts_data = []
    for client in clients:
        account_data = {
            'account_number': fake.random_number(digits=9),
            'client_id': client.id  # Set client_id directly
        }
        accounts_data.append(account_data)
    return accounts_data


# Function to generate random transaction data
def generate_transaction_data(clients):
    transactions_data = []
    for client in clients:
        transaction_data = {
            'transaction_type': random.choice(['Deposit', 'Withdrawal']),
            'transaction_amount': random.uniform(10, 1000),
            'transaction_date': fake.date_time_this_month(),
            'client': client  # Pass the Client object directly
        }
        transactions_data.append(transaction_data)
    return transactions_data

# Function to generate random asset data
def generate_asset_data(clients):
    assets_data = []
    for _ in range(10):  # Generate 10 assets
        client = random.choice(clients)
        asset_data = {
            'type_of_asset': random.choice(['Stock', 'Bond', 'Real Estate']),
            'value': random.uniform(1000, 100000),
            'purchase_price': random.uniform(500, 5000),
            'purchase_date': fake.date_this_decade(),
            'client_id': client.id  # Access client's ID attribute
        }
        assets_data.append(asset_data)
    return assets_data

# Function to generate random holdings data
def generate_holdings_data(accounts, assets, clients):
    holdings_data = []
    for account, asset in zip(accounts, assets):
        holding_data = {
            'number_of_shares': random.randint(10, 100),
            'purchase_price': random.uniform(10, 100),
            'purchase_date': fake.date_this_year(),
            'account_id': account.id,
            'asset_id': asset.id,
            'client': asset.client  # Pass the Client object directly
        }
        holdings_data.append(holding_data)
    return holdings_data

# Function to create seed data
def create_seed_data():
    with app.app_context():
        clients_data = generate_client_data()
        for client_data in clients_data:
            client = Client(**client_data)
            db.session.add(client)
        db.session.commit()

        clients = Client.query.all()
        accounts_data = generate_account_data(clients)
        for account_data in accounts_data:
            account = Account(**account_data)
            db.session.add(account)
        db.session.commit()

        transactions_data = generate_transaction_data(clients)
        for transaction_data in transactions_data:
            transaction = Transactions(**transaction_data)
            db.session.add(transaction)
        db.session.commit()

        assets_data = generate_asset_data(clients)
        for asset_data in assets_data:
            asset = Asset(**asset_data)
            db.session.add(asset)
        db.session.commit()

        accounts = Account.query.all()
        assets = Asset.query.all()
        holdings_data = generate_holdings_data(accounts, assets, clients)
        for holding_data in holdings_data:
            holding = Holdings(**holding_data)
            db.session.add(holding)
        db.session.commit()

# Call the function to create seed data
create_seed_data()