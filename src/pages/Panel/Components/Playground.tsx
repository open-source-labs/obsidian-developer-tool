import React, { useEffect, useState } from 'react';
import QueryInput from './QueryInput';
import QueryOutput from './QueryOutput';
import PlaygroundHeader from './PlaygroundHeader';

const Playground = (props: any) => {
  const [endpoint, setEndpoint] = useState('');
  const [data, setData] = useState({});

  const onEndpointChange = (e) => {
    setEndpoint(e);
  };

  const handleGetData = (query) => {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((data) =>{
        if(!data) throw new Error('Omg no data');
        return data.json();
      })
      .then((response) =>{
        console.log('Response', response);
        console.log(response);
        setData(response);
      } )
      .catch((err) => console.log(err));
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
