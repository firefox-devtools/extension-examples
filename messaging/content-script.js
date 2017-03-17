/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("content-script: LOAD");

// Setup port for communication with the background script
// and send initialization message.
var port = chrome.runtime.connect(null, { name: "content" });
port.postMessage({ action: "init" });

/**
 * Handle messages coming from the panel
 * (relayed through background script).
 */
port.onMessage.addListener(function(message, sender) {
  console.log("content-script: onMessage");

  switch (message.action) {
    case "clearPage":
      window.document.body.innerHTML = "";
      break;
  }
});

/**
 * Handle 'mousemove' DOM events. We are sending these
 * events using 'chrome.runtime.sendMessage' (as an example)
 * but the port could be also used here.
 */
window.addEventListener("mousemove", event => {
  chrome.runtime.sendMessage({
    action: "mousemove",
    pageX: event.pageX,
    pageY: event.pageY,
  });
});
