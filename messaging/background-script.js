/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("background-script: LOAD");

// List of Panel connections.
var connections = {};

/**
 * Collect all connections created by the panel script.
 */
chrome.runtime.onConnect.addListener(function (port) {
  //console.log("background-script onConnect", port);

  // Only collect connections coming from the panel script.
  if (port.name != "panel") {
    return;
  }

  // Define listener as a function so, we can remove it later.
  var extensionListener = function (message, sender, sendResponse) {
    //console.log("background-script port.onMessage", message, sender);

    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.action == "init") {
      connections[message.tabId] = port;
      return;
    }

    // TODO: handle other messages
  }

  // Listen to messages sent from the panel script.
  port.onMessage.addListener(extensionListener);

  // Remove panel connection on disconnect.
  port.onDisconnect.addListener(function(port) {
    //console.log("background-script onDisconnect", port);

    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i=0, len=tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  });
});

/**
 * Receive message from content script and relay to the panel script.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("background-script runtime.onMessage", request, sender);

  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.", connections);
    }
  } else {
    console.log("sender.tab not defined.", sender);
  }

  return true;
});
