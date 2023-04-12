import React, { useState } from "react";
import LeftPanel from "../LeftPanel";
import TaskList from "../TaskList";
import { Route, Switch } from "react-router-dom";

function MainPage() {
  const [tD, setTD] = useState(false)

  return (
    <div className="flx mrg20p">
      <LeftPanel
      setTD={setTD}
      />
      <Switch>
      <Route path="/app/all" >
        <TaskList
        tD={tD}
        setTD={setTD}
        context='allTasks'/>
      </Route>
      <Route path="/app/lists/:listId" >
        <TaskList
        tD={tD}
        setTD={setTD}
        context='list'/>
      </Route>
      <Route path="/app/search/:query" >
      <TaskList
      context='search'
      tD={tD}
      setTD={setTD}
      />
      </Route>
      </Switch>
    </div>
  )
}

export default MainPage;
