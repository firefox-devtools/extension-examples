/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import theme from './theme';

async function init() {
  // initialize our listeners so they send changes to the redux store
  // these also initialize the redux store as well
  theme();

  // Create the panel when DevTools are opened
  browser.devtools.panels.create(
    "DevTools Theme",
    "icons/tool.svg",
    "panel.html"
  );

}

init();
