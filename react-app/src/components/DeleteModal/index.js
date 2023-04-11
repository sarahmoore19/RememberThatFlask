import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteModal({ listId }) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(listActions.deleteList(listId))
    closeModal()
  };

  return (
    <div>
        <h2>Remove List?</h2>
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
