/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("panel: LOAD");

// Setup port for communication with the background script
var port = chrome.runtime.connect(null, { name : 'panel' });
var tabId = chrome.devtools.inspectedWindow.tabId;

// Get reference to UI elements defined in  panel.html
var myButton = document.querySelector("#sendMessageButton");
var myInput = document.querySelector("#message");
var pageX = document.querySelector("#pageX");
var pageY = document.querySelector("#pageY");

/**
 * Handle messages coming from the background script.
 */
port.onMessage.addListener(function(message) {
  console.log("panel: onMessage", message);

  switch (message.action) {
    case 'mousemove':
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
  message.target = "content-script";
  port.postMessage(message);
}

/**
 * Handle click on 'sendMessage' button. The implementation
 * sends a message to the the background script.
 */
myButton.addEventListener("click", event => {
  post({
    action: "message",
    content: myInput.value
  });
}, false);
