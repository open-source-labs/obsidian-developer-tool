import React, { useEffect, useState } from 'react';
import QueryInput from './QueryInput';
import QueryOutput from './QueryOutput';
import PlaygroundHeader from './PlaygroundHeader';

//Component to play with your GQL data (to see how your queries looks like without need to directly manipulate with web application)
const Playground = (props: any) => {
  const [endpoint, setEndpoint] = useState('');
  const [data, setData] = useState({});

  const onEndpointChange = (e) => {
    setEndpoint(e);
  };

  //function that makes fetch request to GQL endpoint with entered query/mutation 
  //Be careful with mutation as it makes direct impact on your DB 
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


  return (
    <div className='playground-container'>
      <PlaygroundHeader onEndpointChange={onEndpointChange} />
      <h2>Current Endpoint: {endpoint}</h2>
      <div className='playground'>
        <QueryInput handleGetData={handleGetData} />
        <QueryOutput data={data} />
      </div>
    </div>
  );
};

export default Playground;
