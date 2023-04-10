import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

function TaskList() {
  const tasks = useSelector(state => state.tasks.allTasks);
  console.log("task in middle component", tasks)
  return (
    <div>
      TaskList component
      {/* tasks.map() */}

    </div>
  )
}

export default TaskList;
