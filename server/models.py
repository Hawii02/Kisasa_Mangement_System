from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()

class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))  
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100))

    accounts = db.relationship('Account', back_populates='client')
    transactions = db.relationship("Transactions", back_populates="client")
    assets = db.relationship('Asset', back_populates='client')
    holdings = db.relationship('Holdings', back_populates='client')

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'accounts': [account.to_dict() for account in self.accounts],
            'assets': [asset.to_dict() for asset in self.assets],
            'transactions': [transaction.to_dict() for transaction in self.transactions],
            'holdings': [holding.to_dict() for holding in self.holdings]
        }


    def __repr__(self):
        return f'<Client {self.id}, {self.first_name}, {self.last_name}, {self.email}>'

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    account_number = db.Column(db.String(20))
   
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))

    client = db.relationship('Client', back_populates='accounts')
    holdings = db.relationship('Holdings', back_populates='account')
    transactions = db.relationship('Transactions', back_populates='account')

    def to_dict(self):
        return {
            'id': self.id,
            'account_number': self.account_number,
            'client_id': self.client_id
        }

    def __repr__(self):
        return f'<Account {self.id}, {self.account_number}>'

class Transactions(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String)
    transaction_amount = db.Column(db.Integer)
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id')) 

    client = db.relationship("Client", back_populates="transactions")
    account = db.relationship("Account", back_populates="transactions")
    
    serialize_rules = ('-client_transactions',)

    def to_dict(self):
        return {
            'id': self.id,
            'transaction_type': self.transaction_type,
            'transaction_amount': self.transaction_amount,
            'transaction_date': self.transaction_date.isoformat(),
            'client': {
                'id': self.client.id,
                'name': self.client.name,
                'email': self.client.email
            }
        }

    def __repr__(self):
        return f'<Transactions {self.id}, {self.transaction_type}, {self.transaction_amount}, {self.transaction_date},{self.client_id}>'

class Asset(db.Model, SerializerMixin):
    __tablename__ = "assets"
    
    id = db.Column(db.Integer, primary_key=True)
    type_of_asset = db.Column(db.String)
    value = db.Column(db.Float)
    purchase_price = db.Column(db.Float)
    purchase_date = db.Column(db.Date)

    holdings = db.relationship('Holdings', back_populates='asset')

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', back_populates='assets')

    def to_dict(self):
        return {
            'id': self.id,
            'type_of_asset': self.type_of_asset,
            'value': self.value,
            'purchase_price': self.purchase_price,
            'purchase_date': self.purchase_date.isoformat(),
            'client_id': self.client_id
        }

    def __repr__(self):
        return f'<Asset {self.id}, {self.type_of_asset}, {self.value}, {self.purchase_price}, {self.purchase_date}>'

class Holdings(db.Model, SerializerMixin):
    __tablename__ = "holdings"

    id = db.Column(db.Integer, primary_key=True)
    number_of_shares = db.Column(db.Float)
    purchase_price = db.Column(db.Float)
    purchase_date = db.Column(db.Date)

    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))

    account = db.relationship('Account', back_populates='holdings')
    asset = db.relationship('Asset', back_populates='holdings')
    client = db.relationship('Client', back_populates='holdings')

    def to_dict(self):
        return {
            'id': self.id,
            'number_of_shares': self.number_of_shares,
            'purchase_price': self.purchase_price,
            'purchase_date': self.purchase_date.isoformat(),
            'account_id': self.account_id,
            'asset_id': self.asset_id,
            'client_id': self.client_id
        }

    def __repr__(self):
        return f'<Holdings {self.id}, {self.number_of_shares}, {self.purchase_price}, {self.purchase_date}>'
