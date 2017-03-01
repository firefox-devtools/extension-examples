/* See license.txt for terms of usage */

/**
 * Create new DevTools panel.
 */
chrome.devtools.panels.create(
  "My Console",
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
