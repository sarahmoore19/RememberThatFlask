from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField
from wtforms.validators import DataRequired, Length
from app.models import Task

v = [DataRequired(), Length(max=60)]

class TaskForm(FlaskForm):
    name = StringField('name', v)
    due_date = DateField('due_date')
    list_id = IntegerField('list_id')
