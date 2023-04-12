import React from 'react'
import { useQueryContext } from '../hooks/useQueryContext';

// used in dashboard panel to show total number of queries made
const QueryTotal = () => {

  const { state } = useQueryContext();

  return (
    <div id='queryTotalContainer'>
      <span className='label-text'>TOTAL QUERIES</span>
      <span className='value-text'>{state.totalQueries}</span>
    </div>
  )
};

export default QueryTotal;