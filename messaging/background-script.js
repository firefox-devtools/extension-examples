/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var connections = {};

console.log("background-script: LOAD");

/**
 * Handle 'connection' event and register other listeners.
 */
chrome.runtime.onConnect.addListener(function(port) {
  var name = port.name;

  console.log('background-script: new connection: ' + name, port);

  /**
   * Handle incoming messages.
   */
  function onMessage(message, sender, reply) {
    console.log('background-script: message received', message);

    var tabId;

    if (message.tabId) {
      tabId = message.tabId
    } else {
      tabId = sender.sender.tab.id;
    }

    if (!connections[tabId]) {
      connections[tabId] = {};
    }

    connections[tabId][name] = port;

    // Forward messages to specified 'target' (might be: 'panel',
    // 'content-script', 'devtools-script').
    if (message.target) {
      if (connections[tabId][message.target]) {
        connections[tabId][message.target].postMessage(message);
      } else {
        console.log('background-script: wrong target ' + message.target);
      }
    }
  }

  /**
   * Handle disconnect event.
   */
  function onDisconnect() {
    console.log('background-script: disconnect');

    port.onMessage.removeListener(onMessage);

    Object.keys(connections).forEach(tabId => {
      if (connections[tabId][name] === port) {
        connections[tabId][name] = null;
        delete connections[tabId][name];
      }
      if (Object.keys(connections[tabId]).length === 0) {
        connections[tabId] = null;
        delete connections[tabId];
      }
    })
  }

  // Register listeners
  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(onDisconnect);

  return true;
});
