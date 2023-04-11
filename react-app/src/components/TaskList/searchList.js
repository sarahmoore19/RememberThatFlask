import React from "react";
import { useParams } from 'react-router-dom';
import TaskList from ".";

function SearchList() {
    const { query } = useParams()

    return (
      <TaskList
      context='search'
      query={query}
      />
    )
  }

export default SearchList
