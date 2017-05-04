/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

console.log("devtools-script: LOAD");

/**
 * Create new DevTools panel "My Panel".
 */
chrome.devtools.panels.create(
  "My Panel",
  "icon.png",
  "panel.html",
  initialize
);

/**
 * Panel initialization. The callback is executed when
 * the panel is initialized. But, the panel script is
 * executed when the panel is selected for the first
 * time (by the user).
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

