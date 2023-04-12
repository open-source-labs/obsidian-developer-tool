// initialize variable to hold value of port once port is connected to DevTools for reusability
let portFromApp;

// listening for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('made it inside background.js->chrome.runtime.onMessage.addListener');
  // console.log('message is', message);

  // sends the received message to DevTools
  portFromApp.postMessage(message);
});

// listening for connection from DevTools
chrome.runtime.onConnect.addListener(port => {
  // save the port to initialized variable
  portFromApp = port;
  // console.log('connected!!');

  // onConnect, send a message to content.js to get current Algo/Capacity in Use
  // grab tab id from browser in order to send message from background.js to content.js
  // messages from background.js to content.js must be done using tabs, not runtime
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    // console.log('tabs is', tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {type: 'algocap'});
    return true;
  })
})