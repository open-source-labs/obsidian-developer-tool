import React, { useEffect, useState } from 'react';
import QueryInput from './QueryInput';
import QueryOutput from './QueryOutput';

const Playground = (props: any) => {
  const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const HeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '35px',
  };

  return (
    <div className='playground-container'>
      <div className='playground-header' style={HeaderStyle}>
        <input
          type='text'
          placeholder='Enter GraphQL endpoint here'
          id='graphql-endpoint'
        />
        <button id='endpoint-submit-button'>Submit</button>
      </div>
      <div className='playground' style={ContainerStyle}>
        <QueryInput />
        <QueryOutput />
      </div>
    </div>
  );
};

export default Playground;
