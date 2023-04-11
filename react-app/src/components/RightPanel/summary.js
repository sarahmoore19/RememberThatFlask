import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

function Summary({nC, nNC, context, list}) {
  // const singleList = useSelector(state => state.list.singleList);
  return (
    <div>
      <h2>{context == 'list' ? list.name : 'All Tasks'}</h2>
      <div>
        <div>
          <div>{nC}</div>
          <div>tasks</div>
        </div>
        <div>
          <div>{nNC}</div>
          <div>completed</div>
        </div>
      </div>
    </div>
  )
}

export default Summary;
