import React from 'react';
import { useQueryContext } from '../hooks/useQueryContext';

// used in dashboard panel, shows hit rate
const QueryHitRate = () => {
  const { state } = useQueryContext();
  return (
    <div id='queryHitRateContainer'>
      <span className='label-text'>QUERY HIT RATE</span>
      <span className='value-text'>{state.totalQueries === 0 ? '0.00%' : ((state.totalHits / state.totalQueries) * 100).toFixed(2) + '%'}</span>
    </div>
  )
};

export default QueryHitRate;