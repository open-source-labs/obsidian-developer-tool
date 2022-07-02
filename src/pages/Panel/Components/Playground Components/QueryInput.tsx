import React, { useEffect, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/mode';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/xq-light.css';
import './playground.css';

//component for graphQL query input within the Playground
const QueryInput = (props) => {
  const [query, setQuery] = useState('');// React hook for inserted query/mutation 

  const onGetData = () => {
    props.handleGetData(query);
  };


  return (
    <div className='queryInput'>
      <div className="head-text"># Write your GraphQL query here</div>
      <CodeMirror
        value={query}
        options={{
          theme: 'material-darker',
          lineNumbers: true,
          mode: 'graphql',
        }}
        onBeforeChange={(editor, data, value) => {
          setQuery(value);
        }}
      />
      <div className='querySubmit' style={{ textAlign: 'center' }}>
        <button id='query-submit-button' onClick={onGetData}>
          Get Data
        </button>
      </div>
    </div>
  );
};

export default QueryInput;
