import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as taskActions from '../../store/tasks';

function DeleteModal({ listId, action, taskId }) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if(action === 'deleteTask') dispatch(taskActions.deleteTask(taskId))
    else dispatch(listActions.deleteList(listId))
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
