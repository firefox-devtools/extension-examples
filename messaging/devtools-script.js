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

