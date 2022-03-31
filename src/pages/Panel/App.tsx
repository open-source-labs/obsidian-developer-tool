import { useState } from 'react';
import Header from './Components/AppBar';
import Playground from './Components/Playground';
import Cache from './Components/Routes/Cache';
import Performance from './Components/Performance Components/Performance';

import './App.css';

function App() {
  const [count, setCount] = useState<number>(1);
  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <Header count={count} setCount={setCount} />
      {count === 1 ? <Performance /> : <div />}
      {count === 2 ? (
        <Cache style={{ width: '100%', minHeight: '100%', backgroundColor: 'rgb(27, 27, 27)' }} />
      ) : <div />}
      {count === 3 ? <Playground /> : <div />}
    </div>
  );
}

export default App;
