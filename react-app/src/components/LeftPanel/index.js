import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import OpenModalButton from '../OpenModalButton';
import ListModal from '../ListModal';
import DeleteModal from '../DeleteModal'

import './leftPanel.css'

function LeftPanel({setTD}) {

  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.allLists);
  let arr = Object.values(lists);

  useEffect(() => {
    dispatch(listActions.allLists())
  }, [dispatch])

  const singleTaskHandler = (listId) => {
    setTD(false)
    dispatch(listActions.singleList(listId))
  }

  const allTasksHandler = () => {
    setTD(false)
    dispatch(taskActions.allTasks())
  }

  return (
    <div className='left-panel'>
      <div className='icon'>
        <img
          width='50px'
          height='50px'
          src="https://static.vecteezy.com/system/resources/previews/002/652/150/original/cute-deer-wild-animal-character-icon-free-vector.jpg"
        />
      </div>
      <div className="inbox">
        <p>Inbox</p>
        <Link
          onClick={allTasksHandler}
          to={'/app/all'}
        >All Tasks</Link>
      </div>
      <ul className="list-name">
        <li className = 'list-create'>
          <div>List</div>
          <div><OpenModalButton
            id='id'
            buttonText={<i class="fas fa-plus"></i>}
            modalComponent={<ListModal action="create" />}
          /></div>
        </li>
        {arr.map(o => (
          <li
            className='one-list'
            key={o.id}>
            <div>
              <Link
                onClick={() => singleTaskHandler(o.id)}
                to={`/app/lists/${o.id}`}
              >
                {o.name}
              </Link>
            </div>
            <div className='list-button'>
              <OpenModalButton
                buttonText={<i class="fas fa-trash-alt"></i>}
                modalComponent={
                <DeleteModal
                action='list'
                listId={o.id} />}
              />
              <OpenModalButton
                buttonText={<i class="fas fa-edit"></i>}
                modalComponent={<ListModal action="rename" listId={o.id} />}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftPanel;
