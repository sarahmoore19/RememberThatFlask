from flask import Blueprint, jsonify
from app.models import db, User, List, Task
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

tasks = Blueprint('tasks', __name__)

@tasks.route('/all')
@login_required
def allTasks():
  id = current_user.id
  tasks = Task.query.filter(Task.user_id == id).all()
  tasksList = [task.to_dict() for task in tasks]
  return tasksList

# get a single task
@tasks.route('/<int:id>')
@login_required
def oneTask(id):
  task = Task.query.get(id)
  taskDict = task.to_dict()
  taskDict['list'] = task.list.to_dict()
  return taskDict

# create a task
@tasks.route('/', methods=['POST'])
@login_required
def createTask():
  pass

# rename a task
@tasks.route('/<int:id>', methods=['PUT'])
@login_required
def renameTask(id):
  task = Task.query.get(id)
  task.name = 'form data here'

# change task from incomplete to complete or vice versa
@tasks.route('/<int:id>', methods=['PUT'])
@login_required
def completeOrIncompleteTask(id):
  task = Task.query.get(id)
  task.completed = not task.completed
  db.session.commit()

# add a task to a list
@tasks.route('/<int:task_id>/list', methods=['PUT'])
@login_required
def addTasktoList(list_id, task_id):
  task = Task.query.get(task_id)
  task.list_id = list_id
  db.session.commit()

# delete task
@tasks.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteTask(id):
  pass
