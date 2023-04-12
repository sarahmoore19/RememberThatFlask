import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function TaskDetail({ currTaskId }) {
  let dispatch = useDispatch()
  let task = useSelector(state => state.tasks.singleTask)

  console.log("this is TaskDetail: ", task.name)
  console.log("currTaskId: ", currTaskId)

  const [inputValue, setInputValue] = useState(task.name);

  useEffect(() => {
    dispatch(taskActions.singleTask(currTaskId))
  }, [dispatch])

  useEffect(() => {
    if (task) {
      setInputValue(task.name);
    }
  }, [task]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    dispatch(taskActions.renameTask(currTaskId, { name: inputValue }))
  };


  return (
    <>
      <div>task details component {task.name}</div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
    </>
  )
}

export default TaskDetail;
