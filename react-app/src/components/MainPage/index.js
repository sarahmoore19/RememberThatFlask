import React, { useState } from "react";
import LeftPanel from "../LeftPanel";
import TaskList from "../TaskList";
import SearchList from "../TaskList/searchList";
import RightPanel from "../RightPanel";
import { Route, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';

function MainPage() {
  return (
    <div className="flx mrg20p">
      <LeftPanel />
      <Switch>
      <Route path="/app/all" >
        <TaskList
        context='allTasks'/>
      </Route>
      <Route path="/app/lists/:listId" >
        <TaskList
        context='list'/>
      </Route>
      <Route path="/app/search/:query" >
        <SearchList />
      </Route>
      </Switch>
    </div>
  )
}

export default MainPage;
