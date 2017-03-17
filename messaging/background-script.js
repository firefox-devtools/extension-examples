/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("background-script: LOAD");

// Map of Panel connections. The 'tabId' is used as key.
// There are two connections/ports for every tabId
// 1) Port to the panel script
// 2) Port to the content script
//
// Example:
// connections[1].panel => pane port
// connections[1].content => content port
var connections = {};

/**
 * Collect all connections created by the panel
 * and content scripts.
 */
chrome.runtime.onConnect.addListener(function (port) {
  console.log("background-script onConnect", port);

  // Only collect connections coming from the panel script
  // and content script.
  if (port.name != "panel" && port.name != "content") {
    return;
  }

  // Define listener as a function so, we can remove it later.
  var extensionListener = function (message, sender, sendResponse) {
    console.log("background-script port.onMessage", message, sender);

    var tabId = sender.sender.tab ? sender.sender.tab.id : message.tabId;

    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly (attached
    // to the 'init' event).
    if (message.action == "init") {
      if (!connections[tabId]) {
        connections[tabId] = {};
      }
      connections[tabId][port.name] = port;
      return;
    }

    // Other messages are relayed to specified target if any
    // and if the connection exists.
    if (message.target) {
      var conn = connections[tabId][message.target];
      if (conn) {
        conn.postMessage(message);
      }
    }
  }

  // Listen to messages sent from the panel script.
  port.onMessage.addListener(extensionListener);

  // Remove panel connection on disconnect.
  // TODO: properly implement the clean up.
  port.onDisconnect.addListener(function(port) {
    console.log("background-script onDisconnect", port);

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
 * This is for messages sent through 'chrome.runtime.sendMessage'.
 * We could use port for that but this is here as an example.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("background-script runtime.onMessage", request, sender);

  // Messages from content scripts should have sender.tab set.
  // The are all relayed to the "panel" connection.
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId]["panel"].postMessage(request);
    } else {
      // This happens if the panel isn't created yet (i.e. the Toolbox
      // not opened and the panel not selected at least once).
      //console.log("Tab not found in connection list.", connections);
    }
  } else {
    console.log("sender.tab not defined.", sender);
  }

  return true;
});
