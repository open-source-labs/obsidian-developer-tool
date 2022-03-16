import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const Cache = (props) => {
	return (
		<CodeMirror
			value='Cache:'
			height='100%'
			// width='100%'
			//  position='absolute'
			//  left='225px'
			style={props.style}
			//  marginTop
			extensions={[javascript({ jsx: true })]}
			theme={oneDark}
			onChange={(value, viewUpdate) => {
				console.log('value:', value);
			}}
		/>
	);
};

export default Cache;
