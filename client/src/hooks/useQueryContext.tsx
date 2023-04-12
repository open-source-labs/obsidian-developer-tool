import React, { useContext } from 'react';
import { QueryContext } from '../contexts/queryContext';

// custom hook for ease of use of custom context; can grab state and dispatch from it
export const useQueryContext = () => {
  const context = useContext(QueryContext);

  if(!context){
    throw Error('useQueryContext should be used in QueryContext Provider');
  };

  return context;
};