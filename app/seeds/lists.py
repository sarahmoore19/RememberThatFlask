from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    housework = List(name='Housework', user_id=1)
    random = List(name='Random', user_id=1)
    school = List(name='School', user_id=2)
    church = List(name='Church', user_id=2)

    db.session.add(housework)
    db.session.add(random)
    db.session.add(school)
    db.session.add(church)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
