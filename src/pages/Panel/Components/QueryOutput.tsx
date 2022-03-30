import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import './playground.css';
import { formatter } from './formatter';

//component for graphQL query output data within playground
const QueryOutput = (props) => {
  const [output, setOutput] = useState(''); //need to pass in gql query results

  useEffect(() => {
    setOutput(formatter(props.data,0));
  }, [props.data]);

  return (
    <div className='queryOutput'>
      <div className="head-text"># GraphQL Query Results</div>
      <CodeMirror
				value={output} 
				extensions={[javascript({ jsx: true })]}
				theme={oneDark}
			/>
    </div>
  );
};

export default QueryOutput;
