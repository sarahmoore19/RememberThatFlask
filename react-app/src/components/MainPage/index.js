import React, { useState } from "react";
import LeftPanel from "../LeftPanel";
import TaskList from "../TaskList";
import RightPanel from "../RightPanel";
import { Route, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';

function MainPage() {
  const { listId } = useParams();
  console.log(listId)
  return (
    <div className="flx mrg20p">

      {/* <LeftPanel />
      <TaskList/>
      <RightPanel />
      <div>listID: {listId}</div> */}
      <LeftPanel />
      <Switch>
        <Route path="/list/:listId" >
          <div>listID: {listId}</div>
          <TaskList/>
          <RightPanel />

        </Route>

      </Switch>
    </div>
  )
}

export default MainPage;
