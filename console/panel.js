/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var output = document.querySelector(".output");
var commandLine = document.querySelector(".commandLine");

/**
 * Register key event on the command line <input> element.
 * If the user presses Enter key the command line value
 * is evaluated in the inspected window.
 */
commandLine.addEventListener("keydown", event => {
  if (event.key == "Enter") {
    let expr = commandLine.value;
    commandLine.value = "";

    chrome.devtools.inspectedWindow.eval(expr, (result, error) => {
      appendLog(expr, result, error);
    });
  }
}, false);

/**
 * Append new log into the output container.
 */
function appendLog(expr, result, error) {
  var exprNode = document.createElement("div");
  var resultNode = document.createElement("div");

  exprNode.classList.add("log");
  exprNode.innerHTML = expr;

  resultNode.classList.add("result");
  resultNode.innerHTML = result;

  if (error) {
    resultNode.classList.add("error");
    resultNode.innerHTML = error.value;
  }

  output.appendChild(exprNode);
  output.appendChild(resultNode);
}

