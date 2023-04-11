import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, StaticRouter, Switch } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as taskActions from '../../store/tasks'
import * as listActions from '../../store/lists';

function Incomplete({tasks}) {

    return (
      <ul>
        <h1>incomplete</h1>
        {tasks.map(t => (
          <li
          key={t.id}>
           {t.name}
          </li>
        ))}
      </ul>
    )
}

export default Incomplete
