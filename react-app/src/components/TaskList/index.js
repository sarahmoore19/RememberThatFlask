import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import * as searchActions from '../../store/search';
import Complete from "../TasksPanel/complete";
import Incomplete from "../TasksPanel/incomplete";
import TaskDetail from '../RightPanel/taskDetail'

function TaskList({ context, query }) {
  let dispatch = useDispatch()
  let { listId } = useParams()
  const [completeContext, setCompleteContext] = useState(false)
  const [currTaskId, setCurrTaskId] = useState(0)
  const [tD, setTD] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  let allTasks = Object.values(useSelector(state => state.tasks.allTasks))
  let list = useSelector(state => state.lists.singleList)
  let tasksNum = useSelector(state => state.tasks.numCompleted)
  let tasksNotNum = useSelector(state => state.tasks.numNotCompleted)
  let searchTasks = Object.values(useSelector(state => state.search.searchResults))
  let searchTasksNum = useSelector(state => state.search.numCompleted)
  let searchTasksNotNum = useSelector(state => state.search.numNotCompleted)
  let tasks
  let nC
  let nNC
  if (context == 'list') {
    tasks = list.tasks
    nC = list.numCompleted;
    nNC = list.numNotCompleted;
  }
  else if (context == 'allTasks') {
    tasks = allTasks
    nC = tasksNum
    nNC = tasksNotNum
  }
  else {
    tasks = searchTasks
    nC = searchTasksNum
    nNC = searchTasksNotNum
  }

  useEffect(() => {
    if (context == 'search') {
      console.log('--------------------', query)
      dispatch(searchActions.allSearch(query))
    }
    dispatch(taskActions.allTasks())
    dispatch(listActions.singleList(listId))
    setTD(false)
  }, [dispatch, completeContext])

  if (!tasks) return null

  let completedTasks = tasks.filter(task => task.completed)
  let incompleteTasks = tasks.filter(task => !task.completed)

  let createTask = async (e) => {
    e.preventDefault()
    setNewTaskName('')
    if (context == 'list') {
      dispatch(taskActions.createTask({
        name: newTaskName,
        list_id: list.id
      }))
      dispatch(listActions.singleList(list.id))
    }

    else {
      dispatch(taskActions.createTask({
        name: newTaskName
      }))
    }
  }

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
        <div>
          <form
          onSubmit={createTask}>
            <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            required
            placeholder="New Task Name"/>
            <button
            type='submit'>
              Add Task
            </button>
          </form>
        </div>
        {completeContext ? (
        <Complete
        tasks={completedTasks}
        tD={tD}
        setTD={setTD}
        currTaskId={currTaskId}
        setCurrTaskId={setCurrTaskId}
        /> ) : (
        <Incomplete
        tasks={incompleteTasks}
        tD={tD}
        setTD={setTD}
        currTaskId={currTaskId}
        setCurrTaskId={setCurrTaskId}
        /> )}
      </div>
      {tD ? (
      <TaskDetail
      currTaskId={currTaskId}
      setCurrTaskId={setCurrTaskId}
      />) : (
      <div>
        <h2>{context == 'list' ? list.name : 'Tasks'}</h2>
        <div>
          <div>
            <div>{nNC}</div>
            <div>tasks</div>
          </div>
          <div>
            <div>{nC}</div>
            <div>completed</div>
          </div>
        </div>
      </div>
      )}
   </div>
  )
}

export default TaskList
