import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

import DeleteModal from '../DeleteModal';
import OpenModalButton from '../OpenModalButton';

function Incomplete({ tasks, tD, setTD, currTaskId, setCurrTaskId }) {
  let dispatch = useDispatch()

  const handleTaskDetails = async (taskId) => {
    if (taskId == currTaskId) setTD(!tD)
    else {
      await dispatch(taskActions.singleTask(taskId))
      setCurrTaskId(taskId)
      setTD(true)
    }
  }

  return (
    <ul>
      <h1>incomplete</h1>
      {tasks.map(t => (
        <>
          <li
            onClick={() => handleTaskDetails(t.id)}
            key={t.id}>
            {t.name}
          </li>
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteModal action='deleteTask' taskId={t.id} />}
          />
        </>
      ))}
    </ul>
  )
}

export default Incomplete
