import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as taskActions from '../../store/tasks';
import * as searchActions from '../../store/search';
import { useParams } from "react-router-dom";

function DeleteModal({ listId, action, taskId, setTD }) {
  const { query } = useParams
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if( action === 'deleteTask' ) {
      dispatch(taskActions.deleteTask(taskId))
      dispatch(searchActions.allSearch(query))
    }
    else dispatch(listActions.deleteList(listId))
    closeModal()
    setTD(false)
  };

  return (
    <div>
        {action === 'deleteTask' ? <h2>Remove Task?</h2> : <h2>Remove List?</h2>}
        <button onClick={handleSubmit}>
          Yes
        </button>
        <button
        onClick={closeModal}>
          No
        </button>
    </div>
  );
}

export default DeleteModal
