import React, { useState } from 'react'
import { useQueryContext } from '../hooks/useQueryContext';
import ListItem from './listItem';

// used in query log panel
// to show all query logs in reverse chronological order
const ReverseList = (props: any) => {
  
  const { state } = useQueryContext();
  
  // create list item for each query metric and push into array that will be shown in component
  const list: Array<JSX.Element> = [];
  for(let i: number = 0; i < state.queryMetrics.length; i++){
    list.push(<ListItem data={state.queryMetrics[i]} />)
  };

  return(
    <div>
      {list.length && list.reverse()}
    </div>
  )
};

export default ReverseList;