/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

console.log("devtools-script: LOAD");

/**
 * Create new DevTools panel.
 */
chrome.devtools.panels.create(
  "My Panel",
  "icon.png",
  "panel.html",
  initialize
);

/**
 * Panel initialization
 */
function initialize(panel) {
  panel.onShown.addListener(function (win) {
    // TODO: initialization steps
  });
}

/**
 * Setup connection to a background page.
 */
var tabId = chrome.devtools.inspectedWindow.tabId;
var port = chrome.runtime.connect(null, { name: "devtools-script" });

function post(message) {
  message.tabId = tabId;
  message.target = "panel";
  port.postMessage(message);
}

port.onDisconnect.addListener(() => {
  console.log("devtools-script: disconnect");
});

port.onMessage.addListener(message => {
  console.log("devtools-script: message received", message);
});
