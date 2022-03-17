import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const Cache = (props) => {
	const [cacheInfo, setCacheInfo] = useState('');

	// listen for message from webpage
	chrome.runtime.onMessageExternal.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (request.cache) {
			setCacheInfo(request.cache);
			console.log("Here's the cache message: ", request.cache);
		}
	});

	// chrome.runtime.onConnect.addListener(function(port) {
	// 	console.assert(port.name = 'cachePort');
	// 	port.onMessage.addListener(function(msg) {
	// 		if (msg = )
	// 	})
	// })

	function handleClearCache() {
		// return chrome.runtime.sendMessage({ clearCache: true });

		return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { clearCache: true });
		});
	}

	// STILL NEED TO FORMAT
	// function formatter(data) {
	// 	let str = '';
	// 	if (Array.isArray(data)) {
	// 		str += '[\n';
	// 		for (let i = 0; i < data.length; i++) {
	// 			str += formatter(data[i]);
	// 		}
	// 		str += ']\n';
	// 	} else if (typeof data === 'object') {
	// 		str += '{\n';
	// 		for (const key in data) {
	// 			str += key + ' : ';
	// 			str += formatter(data[key]);
	// 		}
	// 		str += '}\n';
	// 	} else {
	// 		str += data + '\n';
	// 	}
	// 	return str;
	// }

	return (
		<>
			<button onClick={() => handleClearCache()}>Clear Cache</button>
			<CodeMirror
				value={cacheInfo}
				height='100%'
				// width='100%'
				//  position='absolute'
				//  left='225px'
				style={props.style}
				extensions={[javascript({ jsx: true })]}
				theme={oneDark}
				onChange={(value, viewUpdate) => {
					console.log('value:', value);
				}}
			/>
			<div>{console.log(window.localStorage.getItem('context'))}</div>
		</>
	);
};

export default Cache;
