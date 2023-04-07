from app.models import db, environment, SCHEMA, Task
from sqlalchemy.sql import text

def seed_tasks():
    welcome = Task(name='Welcome', user_id=1, list_id=1)
    wash_car = Task(name='Wash Car', user_id=1, list_id=1)
    walk_dog = Task(name='Walk Dog', user_id=1)
    goodbye = Task(name='Goodbye', user_id=2, list_id=3)
    mop_floors = Task(name='Mop Floors', user_id=2, list_id=3)
    dust = Task(name='Dust', user_id=2)

    db.session.add(welcome)
    db.session.add(wash_car)
    db.session.add(walk_dog)
    db.session.add(goodbye)
    db.session.add(mop_floors)
    db.session.add(dust)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
