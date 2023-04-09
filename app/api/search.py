from flask import Blueprint, jsonify, request
from app.models import db, User, List, Task
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import SearchForm



search = Blueprint('search', __name__)

@search.route('/')
@login_required
def allTasksSearch():
  form = SearchForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    tasks = (Task.query.filter(Task.user_id == id)
    .filter(Task.name.like(f'%{form.data["search"]}%'))
    .all())
    tasksList = [task.to_dict() for task in tasks]
    return tasksList
