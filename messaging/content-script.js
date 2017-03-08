/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("content-script: LOAD");

var port = browser.runtime.connect(null, { name: "content-script" });

chrome.runtime.onConnect.addListener(port => {
  var name = port.name;

  console.log('content-script: new connection: ' + name, port);
});

/**
 * Handle incoming messages.
 */
port.onMessage.addListener((message, sender, reply) => {
  console.log("content-script: message received", message);
});

/**
 * Handle 'mousemove' DOM events.
 */
window.addEventListener("mousemove", event => {
  post({
    action: "mousemove",
    pageX: event.pageX,
    pageY: event.pageY,
  });
});

/**
 * Helper function sending messages to background script.
 */
function post(message) {
  message.target = "panel";
  port.postMessage(message);
}
