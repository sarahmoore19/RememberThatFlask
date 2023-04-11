import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function TaskDetail({currTaskId}) {
  let dispatch = useDispatch()
  let task = useSelector(state => state.tasks.singleTask)

  useEffect(() => {
    dispatch(taskActions.singleTask(currTaskId))
  }, [dispatch])

  return (
    <div>task details component {task.name}</div>
  )
}

export default TaskDetail;
