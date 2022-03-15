import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/mode';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/xq-light.css';

//component for graphQL query input within the Playground
const QueryInput = (props) => {
  const [query, setQuery] = useState('# Write your GraphQL query here \n');

  //can use t = performance.now();

  //function for handling submission of a query
  const handleQuerySubmit = () => {
    //query submit logic here
    //POST request using the graphql endpoint as our fetch url
  };

  const editorStyle = {
    border: '1px outset',
    width: '50vw',
    fontSize: '14px',
  };

  return (
    <div className='queryInput' style={editorStyle}>
      <CodeMirror
        value={query}
        options={{
          theme: 'xq-light',
          lineNumbers: true,
          mode: 'graphql',
        }}
        onBeforeChange={(editor, data, value) => {
          setQuery(value);
        }}
      />
      <div className='querySubmit' style={{ textAlign: 'center' }}>
        <button id='query-submit-button'>Get Data</button>
      </div>
    </div>
  );
};

export default QueryInput;
