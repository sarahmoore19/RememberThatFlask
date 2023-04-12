import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function TaskDetail({ currTaskId, setTD }) {
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    // dispatch(taskActions.renameTask(currTaskId, { name: event.target.value }))
  };

  const handleOnBlur = (event) => {
    dispatch(taskActions.renameTask(currTaskId, { name: event.target.value }))
    dispatch(taskActions.singleTask(currTaskId))
  }

  const handleListChange = (e) => {
    dispatch(taskActions.updateTaskList(task.id, {listId: e.target.value}))
    if (e.target.value) dispatch(listActions.singleList(list.id))
    setTD(false)
  }

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
