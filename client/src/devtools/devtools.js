// This file will create our new Devtool Tab in Devtools
//Learn more about chrome extension architecture here: https://developer.chrome.com/docs/extensions/mv3/architecture-overview/
chrome.devtools.panels.create(
  'Obsidian Developer Tool',
  '../assets/logoSilver.jpg', 
  // pagePath destination is relative to the manifest.json file
  '../dist/index.html'
)