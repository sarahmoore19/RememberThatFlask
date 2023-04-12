import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as taskActions from '../../store/tasks';
import * as searchActions from '../../store/search';

function DeleteModal({ query, listId, action, taskId, setTD }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    console.log(action)
    e.preventDefault()

    if (action == 'list') dispatch(listActions.deleteList(listId))

    else {
      setTD(false)
      await dispatch(taskActions.deleteTask(taskId))

      if ( action === 'deleteTaskList') {
        await dispatch(listActions.singleList(listId))
      }
      else if ( action === 'deleteTaskSearch') {
        await dispatch(searchActions.allSearch(query))
      }
    }

    closeModal()
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
