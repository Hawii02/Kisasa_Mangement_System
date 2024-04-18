"""another migration

Revision ID: 546fcb75c9b4
Revises: beef47245788
Create Date: 2024-04-18 00:50:33.052123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '546fcb75c9b4'
down_revision = 'beef47245788'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('holdings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('number_of_shares', sa.Float(), nullable=True),
    sa.Column('purchase_price', sa.Float(), nullable=True),
    sa.Column('purchase_date', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('holdings')
    # ### end Alembic commands ###
