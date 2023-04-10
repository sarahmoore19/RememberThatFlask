import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function TaskList({ context }) {
  let dispatch = useDispatch()
  let { listId } = useParams()
  let allTasks = Object.values(useSelector(state => state.tasks.allTasks))
  let list = useSelector(state => state.lists.singleList)
  let listTasks = list.tasks
  let tasks;
  context == 'list' ? tasks = listTasks : tasks = allTasks

  useEffect(() => {
    dispatch(taskActions.allTasks())
    dispatch(listActions.singleList(listId))
  }, [dispatch])

  if (!tasks) return null
  if (list.id != listId) return null

  return (
    <div>
      <div>
      <ul>
      {tasks.map(t => (
       <li
       key={t.id}>
        {t.name}
       </li>
      ))}
      </ul>
      </div>
      <div>

      </div>
    </div>
  )
}

export default TaskList;
