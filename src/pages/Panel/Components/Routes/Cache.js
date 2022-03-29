import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const Cache = (props) => {
	const [cacheInfo, setCacheInfo] = useState('');

	// listen for message from webpage
	// chrome.runtime.onMessageExternal.addListener(function (
	// 	request,
	// 	sender,
	// 	sendResponse
	// ) {
	// 	if (request.cache) {
	// 		setCacheInfo(formatter(JSON.parse(request.cache)));
	// 	}
	// 	return true;
	// });

	// refactor with runtime.connect (long-lived connection)
	chrome.runtime.onConnect.addListener(function (port) {
		console.assert(port.name === 'cache');
		port.onMessage.addListener(function (msg) {
			if (msg.cache) {
				console.log('Received the cache message')
				setCacheInfo(formatter(JSON.parse(msg.cache)));
			}
		});
	});

	function handleClearCache() {
		// return chrome.runtime.sendMessage({ clearCache: true });
		setCacheInfo(
			formatter({
				storage: { ROOT_QUERY: {}, ROOT_MUTATION: {} },
				context: 'client',
			})
		);

		return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { clearCache: true });
		});
	}

	// STILL NEED TO FORMAT
	const formatter = (data, spaces = 0) => {
		let str = '';
		if (Array.isArray(data)) {
			str += '[\n';
			spaces++;
			for (let i = 0; i < data.length; i++) {
				str += ' '.repeat(spaces) + formatter(data[i], spaces + 1);
			}
			str += ' '.repeat(spaces) + ']\n';
		} else if (typeof data === 'object') {
			str += '{\n';
			spaces++;
			for (const key in data) {
				str += ' '.repeat(spaces) + key + ' : ';
				str += formatter(data[key], spaces + 1);
			}
			str += ' '.repeat(spaces) + '}\n';
		} else {
			str += data + '\n';
		}
		return str;
	};

	return (
		<div class='position-relative vh-100 w-100'>
			{/* <button onClick={() => handleClearCache()}>Clear Cache</button> */}
			<button
				type='button'
				class='btn btn-primary'
				onClick={() => handleClearCache()}
				id='clearCacheButton'
			>
				Clear Cache
			</button>
			<CodeMirror
				value={cacheInfo}
				// height='100%'
				// width='100%'
				//  position='absolute'
				//  left='225px'
				// marginTop
				style={props.style}
				extensions={[javascript({ jsx: true })]}
				theme={oneDark}
				onChange={(value, viewUpdate) => {
					console.log('value:', value);
				}}
			/>
		</div>
	);
};

export default Cache;
