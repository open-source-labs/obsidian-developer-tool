import React, { useState } from 'react';
import { ListItemType } from '../types';
import { useQueryContext } from '../hooks/useQueryContext';

// individual items in the list of query logs
const ListItem = (props: ListItemType) => {
  const { state, dispatch } = useQueryContext();

  // to allow for each item to expand to show more details on click and collapse if already expanded
  const [expand, setExpand] = useState<boolean>(false);

  const handleClick = () => {
    setExpand(!expand);
    const filter = props.data.mutation ? (el: any) => el.mutation : (props.data.hit ? (el: any) => el.hit && !el.mutation : (el: any) => !el.hit && !el.mutation);
    // console.log('filter is', filter);
    const filtered = state.queryMetrics.filter(filter);
    const index = filtered.indexOf(props.data);
    // console.log('index is', index);
    const sizeArr = new Array(filtered.length);
    sizeArr.fill(8);
    sizeArr[index] = 20;
    if (props.data.mutation){
      dispatch({type: 'SET_MUTATIONSIZE', payload: sizeArr});
    } else if (props.data.hit){
      dispatch({type: 'SET_HITSIZE', payload: sizeArr });
    } 
    else dispatch({type: 'SET_MISSSIZE', payload: sizeArr});
  };

//   console.log('props.data in listItem is', props.data);

  return(
    <div onClick={handleClick} className={`listItem ${props.data.hit ? 'hit' : 'miss'}`}>
      {/* conditional rendering below */}
      {expand ? 
        <div className={`innerListItem`}>
          <span>Date: {props.data.date}</span>
          <span>Query Time: {props.data.time}ms</span>
          <span>Data: {props.data.query}</span>
        </div> 
        :
        <div className={`innerListItem`}>
          <span>{props.data.date}</span>
          <span>{props.data.time}ms</span>
        </div>
      }
    </div>
  )
};

export default ListItem;