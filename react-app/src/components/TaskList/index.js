import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import * as searchActions from '../../store/search';
import TaskDetail from '../RightPanel/taskDetail'
import DeleteModal from '../DeleteModal';
import OpenModalButton from '../OpenModalButton';
import './tasklist.css'

function TaskList({ context, tD, setTD }) {
  let dispatch = useDispatch()
  let { listId, query } = useParams()
  const [completeContext, setCompleteContext] = useState(false)
  const [currTaskId, setCurrTaskId] = useState(0)
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
  let deleteTaskContext
  if (context == 'list') {
    tasks = list.tasks
    nC = list.numCompleted;
    nNC = list.numNotCompleted;
    deleteTaskContext = 'deleteTaskList'
  }
  else if (context == 'allTasks') {
    tasks = allTasks
    nC = tasksNum
    nNC = tasksNotNum
    deleteTaskContext = 'deleteTaskAll'
  }
  else {
    tasks = searchTasks
    nC = searchTasksNum
    nNC = searchTasksNotNum
    deleteTaskContext = 'deleteTaskSearch'
  }

  useEffect(() => {
    if (context == 'list') dispatch(listActions.singleList(listId))
    else if (context == 'allTasks') dispatch(taskActions.allTasks())
    else dispatch(searchActions.allSearch(query))

    setTD(false)
  }, [dispatch, completeContext])

  if (!tasks) return null

  let tasksToSend
  if (completeContext) tasksToSend = tasks.filter(task => task.completed)
  else tasksToSend = tasks.filter(task => !task.completed)

  let createTask = async (e) => {
    e.preventDefault()
    setNewTaskName('')
    if (context == 'list') {
      await dispatch(taskActions.createTask({
        name: newTaskName,
        list_id: list.id
      }))
      await dispatch(listActions.singleList(list.id))
    }

    else {
      await dispatch(taskActions.createTask({
        name: newTaskName
      }))
    }

    if (context == 'search') await dispatch(searchActions.allSearch(query))
  }

  const handleTaskDetails = async (taskId) => {
    if (taskId == currTaskId) setTD(!tD)
    else {
      await dispatch(taskActions.singleTask(taskId))
      setCurrTaskId(taskId)
      setTD(true)
    }
  }

  const changeCompleted = async (taskId) => {
    await dispatch(taskActions.changeCompleteStatus(taskId))
    if (context == 'list') await dispatch(listActions.singleList(listId))
    else if (context == 'search') await dispatch(searchActions.allSearch(query))
  }

  return (
    <div className="border-red grid-1-1">
      <div id="allpanel">
        <div id="outter1">
          <div className="status">
            <button
              className="height-26px bg-transp border-none"
              onClick={() => setCompleteContext(false)}
            >To Do</button>
            <button
              className="height-26px bg-transp border-none"
              onClick={() => setCompleteContext(true)}
            >Completed</button>
          </div>
        </div>

        <div id="outter2">
          <div className="addtaskbar">
            <form
              onSubmit={createTask}>
              <input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
                placeholder="New Task Name" />
              <button
                type='submit'
                className="height-26px"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        <div id="outter3">
          <ul>
            <h1>{completeContext ? 'Completed' : 'To Do'}</h1>

            {tasksToSend.map(t => (
              <>
                <div className="border-style">
                  <li
                    className="bg-blue-7ef-hover"
                    onClick={() => handleTaskDetails(t.id)}
                    key={t.id}>
                    {t.name}
                  </li>
                  <OpenModalButton
                    buttonText={<i class="fas fa-trash-alt"></i>}
                    modalComponent={
                      <DeleteModal
                        listId={listId}
                        query={query}
                        setTD={setTD}
                        action={deleteTaskContext}
                        taskId={t.id} />}
                  />
                  <button
                    onClick={() => changeCompleted(t.id)}
                  >
                    {t.completed ? <i class="fas fa-times"></i>: <i class="fas fa-check"></i>}
                  </button>
                </div>
              </>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-blue">
        {tD ? (
          <TaskDetail
            query={query}
            setTD={setTD}
            currTaskId={currTaskId}
            setCurrTaskId={setCurrTaskId}
          />) : (
          <div className="border-red">
            <h2>
              {context == 'list' && list.name}
              {context == 'allTasks' && 'All Tasks'}
              {context == 'search' && 'Search Results'}
            </h2>
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

    </div>
  )
}

export default TaskList
