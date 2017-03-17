# Messaging
This extension shows how to communicate between panel and content scripts.
Important thing to learn here is that communication between panel and
content can't be done directly. All messages have to be directed through
the background script.

The extensions shows:

1) How to setup port (connection) between the panel and background script
2) How to setup port between the content script and background script.
3) How to implement the background script so, it relays messages
   sent between panel and content.

# Installation
See how to install this extension.

1. Open `about:debugging` in your Firefox
2. Click "Load Temporary Add-on"
3. Open the add-on's directory and select any file inside the add-on.
4. Open DevTools and select `My Panel` panel.
5. Move mouse over the page content and see coordinates in
   the DevTools panel. This is done by sending messages from
   content script to panel script.
6. Click on 'Clear Page' button to erase the page. This is done
   by sending a messages from the panel to the content script.

The add-on will be installed, and will stay installed until you restart Firefox.

See MDN for [more details](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)

# Other Resources
* https://developer.chrome.com/extensions/devtools
* http://stackoverflow.com/questions/14265880/content-script-to-devtools-js-to-my-new-panel
