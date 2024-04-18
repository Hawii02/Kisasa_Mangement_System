from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData 


db = SQLAlchemy()

class Transactions(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    amount = db.Column(db.Integer)
    transaction_date=db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Transactions {self.id}, {self.name}, {self.amount}, {self.created_at} >'


class Assets(db.Model, SerializerMixin):
    __tablename__="assets"

    id=db.Column(db.Integer, primary_key=True)
    type=db.Column(db.String)
    issuer_name=db.Column(db.String)
    current_price=db.Column(db.Float)
    maturity_date=db.Column(db.Date)

    def __repr__(self):
        return f'<assets {self.id},{self.type}, {self.name}, {self.issuer_name},{self.current_price}, {self.maturity_date}'
    

class Holdings(db.Model, SerializerMixin):
    __tablename__="holdings"

    id=db.Column(db.Integer, primary_key=True)
    number_of_shares=db.Column(db.Float)
    purchase_price=db.Column(db.Float)
    purchase_date=db.Column(db.Date)
    
    def __repr__(self):
        return f'<{self.id}, {self.number_of_shares}, {self.purchase_price}, {self.purchase_price}'
    
