import { useState } from 'react';
import Header from './Components/AppBar';
import Playground from './Components/Playground';
import Cache from './Components/Routes/Cache';
import Performance from './Components/Performance Components/Performance';
import { formatter } from './Components/formatter';

import './App.css';

const App = () => {
  const [count, setCount] = useState<number>(1);
	const [cacheInfo, setCacheInfo] = useState('');

	// listen for message from webpage
	chrome.runtime.onMessageExternal.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (request.cache) {
			setCacheInfo(formatter(JSON.parse(request.cache)));
		}
		return true;
	});

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <Header count={count} setCount={setCount} />

      {count === 1 ? <Performance /> : <div> </div>}
      {count === 2 ? (
        <Cache
          style={{
            width: '100%',
            minHeight: '100%',
            backgroundColor: 'rgb(27, 27, 27)',
						fontSize: '12px'
          }}
					cacheInfo={cacheInfo}
					setCacheInfo={setCacheInfo}
        />
      ) : (
        <div> </div>
      )}
      {count === 3 ? <Playground /> : <div> </div>}
    </div>
  );
};

export default App;
