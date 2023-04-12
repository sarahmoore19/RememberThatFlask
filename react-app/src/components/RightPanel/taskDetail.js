import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import * as searchActions from '../../store/search';
import TaskList from "../TaskList";

function TaskDetail({ query, currTaskId, setTD }) {
  let dispatch = useDispatch()
  let task = useSelector(state => state.tasks.singleTask)
  let lists = Object.values(useSelector(state => state.lists.allLists))
  let list = lists.find(l => l.id == task.list_id)
  const [inputValue, setInputValue] = useState(task.name);

  useEffect(() => {
    dispatch(taskActions.singleTask(currTaskId))
    dispatch(listActions.allLists())
  }, [dispatch])

  useEffect(() => {
    if (task) {
      setInputValue(task.name);
    }
  }, [task]);

  const handleInputChange = async (event) => {
    await setInputValue(event.target.value)
    // dispatch(taskActions.renameTask(currTaskId, { name: event.target.value }))
  };

  const handleOnBlur = async (event) => {
    await dispatch(taskActions.renameTask(currTaskId, { name: event.target.value }))
    await dispatch(taskActions.singleTask(currTaskId))
    if (list) await dispatch(listActions.singleList(list.id))
    if (query) await dispatch(searchActions.allSearch(query))
  }

  const handleListChange = async (e) => {
    await dispatch(taskActions.updateTaskList(task.id, {listId: e.target.value}))
    if (list) await dispatch(listActions.singleList(list.id))
    setTD(false)
  }

  if(!task) return null

  return (
    <>
      <div className="border-red">task details component {task.name}</div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleOnBlur} />
      </div>
      <div>
        {list?.name || 'Inbox'}
        <select
        onChange={handleListChange}>
          <option></option>
          <option value={null}>Inbox</option>
          {lists.map(l => (
          <option value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default TaskDetail;
