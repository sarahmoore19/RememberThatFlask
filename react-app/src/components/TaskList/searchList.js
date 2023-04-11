import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';
import * as searchActions from '../../store/search';
import Complete from "../TasksPanel/complete";
import Incomplete from "../TasksPanel/incomplete";

function SearchList() {
    let dispatch = useDispatch()
    const { query } = useParams()
    const [completeContext, setCompleteContext] = useState(false)
    let tasks = Object.values(useSelector(state => state.search.searchResults))
    let numCompleted = useSelector(state => state.search.numCompleted)
    let numNotCompleted = useSelector(state => state.search.numCompleted)

    useEffect(() => {
      //dispatch(searchActions.allSearch(query))
    }, [dispatch])
    if (!tasks) return null

    let completedTasks = tasks.filter(task => task.completed)
    let incompleteTasks = tasks.filter(task => !task.completed)

    return (
      <div>
        <div>
          <div>
            <button
            onClick={() => setCompleteContext(false)}
            >Incomplete</button>
            <button
            onClick={() => setCompleteContext(true)}
            >Complete</button>
          </div>
          {completeContext ? <Complete tasks={completedTasks} /> : <Incomplete tasks={incompleteTasks}/>}
        </div>
        <div>
        <h2>Search</h2>
        <div>
          <div>
            <div>{numCompleted}</div>
            <div>tasks</div>
          </div>
          <div>
            <div>{numNotCompleted}</div>
            <div>completed</div>
          </div>
        </div>
        </div>
      </div>
    )
  }

export default SearchList
