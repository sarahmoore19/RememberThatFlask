import React, { useState } from "react";
import LeftPanel from "../LeftPanel";
import TaskList from "../TaskList";
import RightPanel from "../RightPanel";
import { Route, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';

function MainPage() {
  return (
    <div className="flx mrg20p">
      <LeftPanel />
      <Switch>
      <Route path="/app/all" >
        <div>ALL TASK ROUTE</div>
        <TaskList
        context='allTasks'
        />
      </Route>
      <Route path="/app/lists/:listId" >
        <div>LIST ROUTE</div>
        <TaskList
        context='list'
        />
      </Route>
      </Switch>
    </div>
  )
}

export default MainPage;
