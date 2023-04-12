import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QueryLogGraph from '../components/queryLogGraph';
import ReverseList from '../components/reverseList';
import ListItem from '../components/listItem';
import { DisplayRouteType } from '../types';
import { useQueryContext } from '../hooks/useQueryContext';

// panel for query log; components are - query log graph and either reverse list or one selected list item
const QueryLog = () => {
  const { state } = useQueryContext();

  // manages state for which to display - reverse list (all, which is default) or 1 selected item from the log
  // the main idea is that when a point in the query log graph is clicked, the corresponding data in
  // the query log list will be selected and be the only one displayed as 'selected'
  // user can click back to 'all' to show all items in the query log
  const [display, setDisplay] = useState<string>('all')

  // route handler for conditional rendering of list/list item
  const displayRoute: DisplayRouteType = {
    all: <ReverseList />,
    selected: <ListItem data={state.open}/>
  }

  const handleClick = (e: React.SyntheticEvent): void  => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    setDisplay(target.id)
  }
  
  return(
    <div className='querylog'>
      <QueryLogGraph setDisplay={setDisplay}/>
      <div>
        <button id='all' onClick={handleClick} className={`display ${display === 'all' ? 'show' : ''}`}>All</button>
        <button id='selected' onClick={handleClick} className={`display ${display === 'selected' ? 'show' : ''}`}>Selected</button>
      </div>
      {display && displayRoute[display]}
    </div>
  )
}

export default QueryLog;