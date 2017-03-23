"use strict";

console.log("panel: LOAD");

// Setup port for communication with the background script
var port = chrome.runtime.connect(null, { name: "panel" });
var tabId = chrome.devtools.inspectedWindow.tabId;

// Get reference to UI elements defined in panel.html
var clearPage = document.querySelector("#clearPage");
var pageX = document.querySelector("#pageX");
var pageY = document.querySelector("#pageY");

/**
 * Handle 'mouseMove' messages coming from the content script.
 */
port.onMessage.addListener(function(message, sender) {
  console.log("panel: onMessage", message, sender);

  switch (message.action) {
    case "mousemove":
      pageX.innerHTML = message.pageX;
      pageY.innerHTML = message.pageY;
      break;
  }
});

/**
 * Helper for sending a message to the background script.
 */
function post(message) {
  message.tabId = tabId;
  port.postMessage(message);
}

/**
 * Handle click on 'clearPage' button and send one-shot message
 * to the content script (it's relayed through background
 * script).
 */
clearPage.addEventListener("click", event => {
  chrome.runtime.sendMessage({
    action: "clearPage",
    target: "content",
    tabId
  });
}, false);

// Sent initialization message.
post({action: "init"});
