import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function LeftPanel() {

  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.allLists);
  console.log('=================', lists)
  let arr = Object.values(lists);

  useEffect(() => {
    dispatch(listActions.allLists())
  }, [dispatch])

  function getTaskAndListInfo() {
    dispatch(taskActions.allTasks)
    dispatch(listActions.singleList)
  }

  return (
  <div>
    <div>
    <img
    width='50px'
    height='50px'
    src="https://static.vecteezy.com/system/resources/previews/002/652/150/original/cute-deer-wild-animal-character-icon-free-vector.jpg"
    />
    </div>
    <div className="border-red">
      <p>Inbox</p>
      <Link
      to={'app/tasks/all'}
      >All Tasks</Link>
    </div>
    <ul className="border-red">
      <li>List</li>
      {arr.map(o => (
       <li>
        <button onClick={getTaskAndListInfo}>
          {o.name}
        </button>
       </li>
      ))}
    </ul>
  </div>
  )

}

export default LeftPanel;
