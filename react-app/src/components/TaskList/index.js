import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import Complete from "../TasksPanel/complete";
import Incomplete from "../TasksPanel/incomplete";
import Summary from '../RightPanel/summary'
import TaskDetail from '../RightPanel/taskDetail'

// hey guys i feel like there is too much going on on this page, feel like we should split this component into different ones (list tasks, all tasks, and search tasks)
// especially when we implement the buttons like delete update create etc .... buttons will all have different functions and going to get confusing - sarah

function TaskList({ context }) {
  let dispatch = useDispatch()
  let { listId } = useParams()
  const [completeContext, setCompleteContext] = useState(false)
  const [currTaskId, setCurrTaskId] = useState(0)
  const [tD, setTD] = useState(false)
  let allTasks = Object.values(useSelector(state => state.tasks.allTasks))
  let list = useSelector(state => state.lists.singleList)
  let tasksNum = useSelector(state => state.tasks.numCompleted)
  let tasksNotNum = useSelector(state => state.tasks.numNotCompleted)
  let tasks
  let nC
  let nNC
  if (context == 'list') {
    tasks = list.tasks
    nC = list.numCompleted;
    nNC = list.numNotCompleted;
  }
  else {
    tasks = allTasks
    nC = tasksNum
    nNC = tasksNotNum
  }

  useEffect(() => {
    dispatch(taskActions.allTasks())
    dispatch(listActions.singleList(listId))
    setTD(false)
  }, [dispatch, completeContext])

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
        <h2>{context == 'list' ? list.name : 'All Tasks'}</h2>
        <div>
          <div>
            <div>{nC}</div>
            <div>tasks</div>
          </div>
          <div>
            <div>{nNC}</div>
            <div>completed</div>
          </div>
        </div>
      </div>
      )}
   </div>
  )
}

export default TaskList
