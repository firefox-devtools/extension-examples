/* See license.txt for terms of usage */

var verbose = true;

function log() {
  if (!verbose) {
    return;
  }

  console.log.apply(
    console, [
      '%c MyPanel ',
      'background: #007AA3; color: #ffffff; text-shadow: 0 -1px #000; padding: 4px 0 4px 0; line-height: 0',
      ...arguments
    ]
  );
}

log('content-scripts.js', window.location.toString());
