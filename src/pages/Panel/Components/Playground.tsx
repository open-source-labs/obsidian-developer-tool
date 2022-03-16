import React, { useEffect, useState } from 'react';
import QueryInput from './QueryInput';
import QueryOutput from './QueryOutput';
import PlaygroundHeader from './PlaygroundHeader';

const Playground = (props: any) => {
  const [endpoint, setEndpoint] = useState('');
  const [data, setData] = useState([]);

  const onEndpointChange = (e) => {
    setEndpoint(e);
  };

  const handleGetData = (query) => {
    const str = endpoint + query;
    // console.log('In parent component');
    // console.log('Endpoint', endpoint);
    // console.log('Query', query);
    // console.log('Path', str);
    // console.log('Length', str.length);
    fetch(str)
      .then((data) => data.json())
      .then((messages) => {
        const arr = messages.slice(0, 10);
        console.log('Here is data witrh messages');
        console.log(arr);
        setData([...arr]);
      })
      .catch((err) => console.log(err));

    // fetch(endpoint, {
    //   method: 'POST',
    //   //mode: 'no-cors',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     query: query,
    //   }),
    // })
    //   .then((data) =>{
    //     if(!data) throw new Error('Omg no data');
    //     return data.json();
    //   })
    //   .then((response) => console.log('Response', response))
    //   .catch((err) => console.log(err));
  };

  const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div className='playground-container'>
      <h1>{endpoint}</h1>
      <PlaygroundHeader onEndpointChange={onEndpointChange} />
      <div className='playground' style={ContainerStyle}>
        <QueryInput handleGetData={handleGetData} />
        <QueryOutput data={data}/>
      </div>
    </div>
  );
};

export default Playground;
