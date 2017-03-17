// Create a panel when DevTools are opened
// https://developer.chrome.com/extensions/devtools_panels#method-create
chrome.devtools.panels.create(
  "My Panel",
  "icon.png",
  "panel.html",
  onCreated
);

function onCreated(panel) {
  // To see these log messages, open the Browser Console:
  // Tools -> Web Developer -> Browser Console
  console.log('Panel created:', panel);
}
