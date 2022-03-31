import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { formatter } from '../formatter';

const Cache = (props) => {
	const [cacheInfo, setCacheInfo] = useState('');

	// listen for message from webpage
	chrome.runtime.onMessageExternal.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (request.cache) {
			setCacheInfo(formatter(JSON.parse(request.cache)));
			console.log("Here's the cache message: ", request.cache);
			console.log("Here's the cache type: ", JSON.parse(request.cache));
		}
		return true;
	});

		// allows us to clear the browser cache
	function handleClearCache() {
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

	return (
		<div id='cache' class='position-relative vh-100 w-100'>
			
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
