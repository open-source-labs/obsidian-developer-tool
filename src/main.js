const clearCacheButton = document.getElementById('clearCacheButton');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if ((request.clearCache = true)) {
		clearCacheButton.click();
	}
});
