// import browserAction from './browserAction';
import commands from './commands';

async function init() {
  // initialize our listeners so they send changes to the redux store
  // these also initialize the redux store as well
  commands();
  // browserAction();
}

init();
