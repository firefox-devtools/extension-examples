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
  console.log("DevTools panel initialized");

  panel.onShown.addListener(function (win) {
    // My panel has been shown
  });

  panel.onHidden.addListener(function (win) {
    // My panel has been hidden
  });
}

