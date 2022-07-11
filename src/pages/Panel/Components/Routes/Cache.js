import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2-react-17';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { formatter } from '../formatter';

const Cache = (props) => {
	// const [cacheInfo, setCacheInfo] = useState('');

	// // listen for message from webpage
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
	// chrome.runtime.onConnectExternal.addListener(function (port) {
	// 	console.log('connected', port);
	// 	console.assert(port.name === 'cache');
	// 	port.onMessage.addListener(
	// 		function (msg) {
	// 			console.log("Here's the message: ", msg);
	// 			setCacheInfo(formatter(JSON.parse(msg.cache)));
	// 			// if (msg.cache) {
	// 			// 	console.log('Received the cache message');
	// 			// 	setCacheInfo(formatter(JSON.parse(msg.cache)));
	// 			// }
	// 		},
	// 		{ passive: true }
	// 	);
	// });

	function handleClearCache() {
		// return chrome.runtime.sendMessage({ clearCache: true });
		props.setCacheInfo(
			formatter({
				storage: { ROOT_QUERY: {}, ROOT_MUTATION: {} },
				context: 'client',
			})
		);

		return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { clearCache: true });
		});
	}

	return (
		<div id='cache' class='position-relative vh-100 w-100'>
			{/* <button onClick={() => handleClearCache()}>Clear Cache</button> */}
			<button
				type='button'
				class='btn btn-primary btn-sm'
				onClick={() => handleClearCache()}
				id='clearCacheButton'
			>
				Clear Cache
			</button>
			<CodeMirror
				value={props.cacheInfo}
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
