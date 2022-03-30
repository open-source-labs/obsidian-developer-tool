import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror';
// import 'codemirror-graphql/lint';
// import 'codemirror-graphql/hint';
// import 'codemirror-graphql/mode';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material-darker.css';
// import 'codemirror/theme/xq-light.css';
import './playground.css';

//component for graphQL query output data within playground
const QueryOutput = (props) => {
  const [output, setOutput] = useState(''); //need to pass in gql query results
  console.log('In QueryOutput');
  console.log(props.data);

  useEffect(() => {
    setOutput(formatter(props.data,0));
  }, [props.data]);

  const formatter = (data, spaces=0) =>{
    let str = '';
    if(Array.isArray(data)){
      str += '[\n';
      spaces++;
      for( let i = 0; i < data.length; i++){
        str += ' '.repeat(spaces) + formatter(data[i],spaces + 1);
      }
      str += ' '.repeat(spaces) + ']\n';
    }
    else if(typeof data === 'object'){
      str += '{\n';
      spaces++;
      for(const key in data){
        str += ' '.repeat(spaces) + key + ' : ';
        str += formatter(data[key], spaces + 1);
      }
      str += ' '.repeat(spaces) + '}\n';
    } else {
      str +=  data + '\n';
    }
    return str;
  }

  return (
    <div className='queryOutput'>
      <div className="head-text"># GraphQL Query Results</div>
      <CodeMirror
				value={output} 
				// height='100%'
				// width='100%'
				//  position='absolute'
				//  left='225px'
				// marginTop
				extensions={[javascript({ jsx: true })]}
				theme={oneDark}
        // onChange={(editor, data, value) => {
        //   setOutput(props.data.toString());
        // }}
			/>
      {/* <CodeMirror
        value={output} 
        options={{
          theme: 'material-darker',
          lineNumbers: false,
          mode: 'graphql',
        }}
        onBeforeChange={(editor, data, value) => {
          setOutput(props.data.toString());
        }}
      /> */}
    </div>
  );
};

export default QueryOutput;
