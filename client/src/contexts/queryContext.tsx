import React from "react";
import { createContext, useReducer, Dispatch } from "react";
import { action } from '../types';
import { State } from "../types";

// sets a default pointer size for each point in the log graph
// goal is that if a query log is clicked from the list,
// the corresponding point in the graph will become bigger
const DEFAULT_POINTER_SIZE: number = 8; 

// custom context for easier state management
export const QueryContext = createContext<{state: State, dispatch: Dispatch<action>}>({
  dispatch: () => null,
  state: {
    totalQueries: 0,
    totalHits: 0,
    queryMetrics: [],
    hitSize: [],
    missSize: [],
    mutationSize: [],
    open: {}
  }
});

const queryMetricReducer = (state: State, action: action): State => {
  switch(action.type) {
    case 'ADD_HIT_QUERY':
      return {
        totalQueries: state.totalQueries + 1,
        totalHits: state.totalHits + 1,
        queryMetrics: [...state.queryMetrics, action.payload],
        hitSize: [...state.hitSize, DEFAULT_POINTER_SIZE],
        missSize: [...state.missSize],
        mutationSize: [...state.mutationSize],
        open: state.open
      };

    case 'ADD_MISSED_QUERY':
      return {
        totalQueries: state.totalQueries + 1,
        totalHits: state.totalHits,
        queryMetrics: [...state.queryMetrics, action.payload],
        hitSize: [...state.hitSize],
        missSize: [...state.missSize, DEFAULT_POINTER_SIZE],
        mutationSize: [...state.mutationSize],
        open: state.open
      };
    
    case 'SET_OPEN':
      return {
        totalQueries: state.totalQueries,
        totalHits: state.totalHits,
        queryMetrics: [...state.queryMetrics],
        hitSize: [...state.hitSize].fill(8),
        missSize: [...state.missSize].fill(8),
        mutationSize: [...state.mutationSize].fill(8),
        open: action.payload
      };

    case 'SET_HITSIZE':
      const newMiss = [...state.missSize].fill(8);
      const newMutation = [...state.mutationSize].fill(8);
      return {
        totalQueries: state.totalQueries,
        totalHits: state.totalHits,
        queryMetrics: [...state.queryMetrics],
        hitSize: action.payload,
        missSize: newMiss,
        mutationSize: newMutation,
        open: state.open
      };

    case 'SET_MUTATIONSIZE':
      const newHit = [...state.hitSize].fill(8);
      const newMisses = [...state.missSize].fill(8);
      return {
        totalQueries: state.totalQueries,
        totalHits: state.totalHits,
        queryMetrics: [...state.queryMetrics],
        hitSize: newHit,
        missSize: newMisses,
        mutationSize: action.payload,
        open: state.open
      };
    
    case 'SET_MISSSIZE':
      const newHits = [...state.hitSize].fill(8);
      const newMutations = [...state.mutationSize].fill(8);
      return {
        totalQueries: state.totalQueries,
        totalHits: state.totalHits,
        queryMetrics: [...state.queryMetrics],
        hitSize: newHits,
        missSize: action.payload,
        mutationSize: newMutations,
        open: state.open
      }

    default:
      return state;
  };
};

export const QueryContextProvider = ({ children }: {children: JSX.Element}) => {
  const initial: State = {
    totalQueries: 0,
    totalHits: 0,
    queryMetrics: [],
    hitSize: [],
    missSize: [],
    mutationSize: [],
    open: {}
  };

  const [ state, dispatch ] = useReducer(queryMetricReducer, initial);

  return (
    <QueryContext.Provider value={{state, dispatch}}>
      {children}
    </QueryContext.Provider>
  )
};