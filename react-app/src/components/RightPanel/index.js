import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

function RightPanel() {
  // const singleList = useSelector(state => state.list.singleList);
  return (
    <div>
      <div>use ternary to render either one depends on props</div>
      <div>list summary</div>
      <div>task detail</div>
    </div>
  )
}

export default RightPanel;
