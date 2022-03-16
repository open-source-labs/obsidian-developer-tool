import React, { useEffect, useState } from 'react';

const PlaygroundHeader = (props) => {
  const [inputValue, setValue] = useState('');

  const handleEndpointSubmit = () => {
    props.onEndpointChange(inputValue);
    setValue('');
    // console.log(inputValue);
    // console.log('we are working!');
  };

  const onChange = (e) => {
    setValue(e.target.value);
    // console.log('we are in onChange');
    // console.log(e.target.value);
  };

  const HeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '35px',
  };

  return (
    <div className='playground-header' style={HeaderStyle}>
      <input
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
