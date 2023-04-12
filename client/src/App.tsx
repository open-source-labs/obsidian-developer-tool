import { useState, useEffect } from 'react';
import './stylesheets/App.scss';
import QueryLog from './panels/queryLog.js';
import Dashboard from './panels/dashboard.jsx';
import Navbar from './components/Navbar';
import { Route, DOMMessage } from './types';
import { useQueryContext } from './hooks/useQueryContext';

//browser router and routes don't work - no urls in devtools

function App(): JSX.Element {
  const [algo, setAlgo] = useState<string>('');
  const [capacity, setCapacity] = useState<number | null>(null);
  const [currentlyOpen, setCurrentlyOpen] = useState<keyof Route>('dashboard');
  const { dispatch } = useQueryContext();
  const routes: Route = {
    'dashboard': <Dashboard algo={algo} capacity={capacity}/>,
    'querylog': <QueryLog />
  };

  // put chrome.runtime.connect in useEffect
  // save the connect in a variable
  // add listener on the port variable for onMessage
  useEffect(() => {
    // console.log('inside extensions App.jsx useEffect');

    const port: chrome.runtime.Port = chrome.runtime.connect();
    port.onMessage.addListener((message: DOMMessage, port: chrome.runtime.Port) => {

      // console.log('in port listener!');
      // console.log('message is in APP!!!', message);

      if(message.algo) {
        setAlgo(message.algo);
        setCapacity(message.capacity);
      }
      // dispatch to reducer
      // NEED TO HAVE LOGIC TO SPECIFIY CASE
      else if (message.type === 'query') {
        let situation: string;
        message.hit === true ? situation = 'ADD_HIT_QUERY' : situation = 'ADD_MISSED_QUERY';
        const metrics = {
          time: message.time,
          date: message.date,
          hit: message.hit,
          query: message.query,
          mutation: false
        }
        dispatch({type: situation, payload: metrics});
        console.log('this is metrics in App as payload', metrics)
      }
    });
  }, [])

  return (
    <div className='panelContainer'>
      <Navbar setCurrentlyOpen={setCurrentlyOpen} currentlyOpen={currentlyOpen} algo={algo} />
      {currentlyOpen && routes[currentlyOpen]}
    </div>
  )
};

export default App
