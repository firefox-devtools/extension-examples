# DevTools Extension Examples

This repository is a collection of DevTools extension examples, demonstrating how to build addons for Firefox DevTools using the [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) APIs.

## Getting started

To install and run any of the addons in this repository, follow the instructions for [temporary installation in Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

This is *the developer way* of doing it, and is not the way users of your addons will use.

If you're new to the WebExtensions + DevTools world, we recommend you look at the addons in the following order:

### [<tt>devtools-panel</tt>](./devtools-panel)

Shows how to create a new panel in DevTools.

### [<tt>console</tt>](./console)

Demonstrates how to evaluate scripts in the inspected window (i.e. the `content` scope).

### [<tt>messaging</tt>](./messaging)

*(Work in progress)*

Demonstrates how to communicate among different scopes.

## More resources

* Look at [bug 1211859 - Implement devtools API for open extension API](https://bugzilla.mozilla.org/show_bug.cgi?id=1211859) to track progress on Firefox implementation.
* [WebExtension Experiments](https://github.com/web-ext-experiments) is a repository with more *adventurous* examples.
* [Media Panel](https://github.com/karolien/media-devtools-panel): a WebExtension to add a *Media* panel to DevTools.
