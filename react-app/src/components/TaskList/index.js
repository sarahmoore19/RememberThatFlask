import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';

function TaskList() {
  let p = useParams()
  const tasks = useSelector(state => state.tasks.allTasks);

  console.log("task in middle component", tasks)
  return (
    <div>
      {p.listId}
    </div>
  )
}

export default TaskList;
