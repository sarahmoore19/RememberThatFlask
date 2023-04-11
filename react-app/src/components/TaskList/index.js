import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import Complete from "../TasksPanel/complete";
import Incomplete from "../TasksPanel/incomplete";

// hey guys i feel like there is too much going on on this page, feel like we should split this component into different ones (list tasks, all tasks, and search tasks)
// especially when we implement the buttons like delete update create etc .... buttons will all have different functions and going to get confusing - sarah

function TaskList({ context }) {
  let dispatch = useDispatch()
  let { listId } = useParams()
  const [completeContext, setCompleteContext] = useState(false)
  let allTasks = Object.values(useSelector(state => state.tasks.allTasks))
  let list = useSelector(state => state.lists.singleList)
  let tasksNum = useSelector(state => state.tasks.numCompleted)
  let tasksNotNum = useSelector(state => state.tasks.numNotCompleted)
  let tasks;
  let numCompleted;
  let numNotCompleted;
  if (context == 'list') {
    tasks = list.tasks
    numCompleted = list.numCompleted;
    numNotCompleted = list.numNotCompleted;
  }
  else {
    tasks = allTasks
    numCompleted = tasksNum
    numNotCompleted = tasksNotNum
  }


  useEffect(() => {
    dispatch(taskActions.allTasks())
    dispatch(listActions.singleList(listId))
  }, [dispatch])

  if (!tasks) return null

  let completedTasks = tasks.filter(task => task.completed)
  let incompleteTasks = tasks.filter(task => !task.completed)

  return (
    <div>
      <div>
        <div>
          <button
          onClick={() => setCompleteContext(false)}
          >Incomplete</button>
          <button
          onClick={() => setCompleteContext(true)}
          >Complete</button>
        </div>
        {completeContext ? <Complete tasks={completedTasks} /> : <Incomplete tasks={incompleteTasks}/>}
      </div>
      <div>
      <h2>{context == 'list' ? list.name : 'All Tasks'}</h2>
      <div>
        <div>
          <div>{numCompleted}</div>
          <div>tasks</div>
        </div>
        <div>
          <div>{numNotCompleted}</div>
          <div>completed</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default TaskList;
