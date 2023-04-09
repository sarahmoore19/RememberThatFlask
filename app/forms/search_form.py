from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Task


v = [DataRequired()]

class SearchForm(FlaskForm):
    search = StringField('search', v)
