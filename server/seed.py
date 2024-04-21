from faker import Faker
from app import app, db
from models import Inventory, Orders

fake=Faker()

with app.app_context():

    num_inventory=50
    for _ in range(num_inventory):
        
        inventory=Inventory(
            name=fake.word(),
            price=fake.random_number(digits=3),
            description=fake.sentence()
        )

        db.session.add(inventory)
        db.session.commit()

    num_orders=50
    for _ in range(num_orders):
        orders=Orders(
            name=fake.word(),
            price=fake.random_number(digits=3),
            quantity=fake.random_number()

        )
        db.session.add(orders)
        db.session.commit()