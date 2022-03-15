import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/mode';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/xq-light.css';

//component for graphQL query output data within playground
const QueryOutput = (props) => {
  const [output, setOutput] = useState('# GraphQL Query Results \n'); //need to pass in gql query results

  const editorStyle = {
    border: '1px outset',
    width: '50vw',
    fontSize: '14px',
  };

  return (
    <div className='queryOutput' style={editorStyle}>
      <CodeMirror
        value={output}
        options={{
          theme: 'xq-light',
          lineNumbers: false,
          mode: 'json',
        }}
        onBeforeChange={(editor, data, value) => {
          setOutput(value);
        }}
      />
    </div>
  );
};

export default QueryOutput;
