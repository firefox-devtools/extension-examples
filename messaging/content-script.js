"use strict";

console.log("content-script: LOAD");

var port;

/**
 * Lazily setup port for communication with the background script
 * and send initialization message.
 */
function setupPortIfNeeded() {
  if (!port) {
    port = chrome.runtime.connect(null, { name: "content" });
    port.postMessage({ action: "init" });
    port.onDisconnect.addListener(function () {
      port = null;
    });
  }
}

/**
 * Handle requests coming from the panel
 * (relayed through background script).
 */
chrome.runtime.onMessage.addListener(function(message) {
  console.log("content-script: onMessage", message);

  switch (message.action) {
  case "clearPage":
    window.document.body.innerHTML = "";
    break;
  }
});

/**
 * Send mouse coordinates to DevTools panel script.
 */
function sendMouseEvent(event) {
  setupPortIfNeeded();
  port.postMessage({
    action: "mousemove",
    pageX: event.pageX,
    pageY: event.pageY,
    target: "panel",
  });
}

/**
 * Handle 'mousemove' DOM events. We are sending these
 * events using a port to DevTools panel.
 */
window.addEventListener("mousemove", event => sendMouseEvent(event));
