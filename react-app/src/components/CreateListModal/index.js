import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function CreateListModal() {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    return dispatch(listActions.createlist(
      {name: listName}
      ))
      .then(closeModal)
  };

  return (
    <div className='new-list-form'>
      <h1>Add a List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Please enter a new list name:
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateListModal;
