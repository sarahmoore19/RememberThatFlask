import React, { useState } from "react";
import LeftPanel from "../LeftPanel";
import TaskList from "../TaskList";
import RightPanel from "../RightPanel";

function MainPage() {
  return (
    <div className="flx mrg20p">
      <LeftPanel />
      <TaskList/>
      <RightPanel />
    </div>
  )
}

export default MainPage;
