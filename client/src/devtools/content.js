// ADD SOME LOGIC HERE TO START THE FOLLOWING SCRIPT IF WEBSITE USES OBSIDIAN WRAPPER
// ON PAGE LOAD, 
// listening for message from Obsidian Wrapper and sends message to background.js
window.addEventListener('message', msg => {
  // SHAPE OF OBJECT THAT WE SEND HAS TO INCLUDE OBSIDIAN IDENTIFIER
  // IF IT DOES WE WILL CONTINUE MESSAGE CHAIN

  // console.log('made it inside content.js->window.addEventListener');
  // console.log('message is', msg.data);

  // this is for the initial request for algorithm used and capacity
  if(msg.data.algo){
    // console.log('msg.data.algo is', msg.data)
    chrome.runtime.sendMessage({algo: msg.data.algo, capacity: msg.data.capacity})
  } else if(msg.data.type === 'query'){
    // this is for all queries made
    chrome.runtime.sendMessage({
      type: msg.data.type,
      time: msg.data.time,
      date: msg.data.date,
      query: msg.data.query,
      hit: msg.data.hit
    });
  }
  }
)

// listening for message from background.js and sends a message to Obsidian Wrapper
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('made it inside content.js->chrome.runtime.onMessage.addListener');
  // console.log('message is', message);

  // post message to Obsidian Wrapper
  window.postMessage(message);

  // returns true to resolve promise but does not seem to be working
  // still getting error of uncaught promise but does not break the devtool
  return true;
 }
)