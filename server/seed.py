# seed.py

from app import app, db
from models import Transactions, Assets
from faker import Faker
from datetime import datetime, timedelta

def seed():
    fake = Faker()
    
    with app.app_context():
        db.session.query(Transactions).delete()
        db.session.query(Assets).delete()
        
        for _ in range(20):
            transaction_date = datetime.utcnow() - timedelta(days=fake.random_int(min=0, max=30))
            
            transaction = Transactions(
                name=fake.word(),
                amount=fake.random_int(min=100, max=1000),
                transaction_date=transaction_date
            )
            db.session.add(transaction)
        
        for _ in range(20):
            asset = Assets(
                type=fake.word(),
                issuer_name=fake.company(),
                current_price=fake.random_number(digits=4, fix_len=True),
                maturity_date=fake.date_between(start_date='-1y', end_date='+1y')
            )
            db.session.add(asset)
        
        db.session.commit()

if __name__ == '__main__':
    seed()
