import React, { useEffect, useState } from 'react';
import './playground.css'

const PlaygroundHeader = (props) => {
  const [inputValue, setValue] = useState('');

  const handleEndpointSubmit = () => {
    props.onEndpointChange(inputValue);
    setValue('');
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };


  return (
    <div className='playground-header'>
        <input
          className='form-control'
          type='text'
          placeholder='Enter GraphQL endpoint here'
          id='graphql-endpoint'
          value={inputValue}
          onChange={onChange}
        />
        <button id='endpoint-submit-button' onClick={handleEndpointSubmit}>
          Submit
        </button>
    </div>
  );
};

export default PlaygroundHeader;
