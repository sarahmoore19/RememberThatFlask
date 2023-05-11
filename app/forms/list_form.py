from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import List

v = [DataRequired(), Length(max=60)]

class ListForm(FlaskForm):
    name = StringField('name', v)
