import React, { useState } from "react";
import * as listActions from '../../store/lists';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function ListModal({ action, listId }) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(action == "create") {
      return dispatch(listActions.createlist(
        { name: listName }
      ))
        .then(closeModal)
        .then(history.push('/app/all'))
    }

    else if(action=="rename") {
      return dispatch(listActions.renameList(listId, { name: listName }))
      .then(closeModal)
      .then(history.push('/app/all'))
    }

  };

  return (
    <div className='new-list-form'>
      {action == "create" ? <h1>Add a List</h1> : <h1>Rename List</h1>}
      <form onSubmit={handleSubmit}>
        {action == "create" ? (<label>
          Please enter a new list name:
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
        </label>) :
          (<label>
            List name:
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              required
            />
          </label>)
        }

        {action == "create" ? <button type="submit">Add</button> : <button type="submit">Save</button>}

        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
}

export default ListModal;
