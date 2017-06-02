import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createUIStore } from 'redux-webext';
import Panel from './components/panel';

async function init() {
  const store = await createUIStore();

  ReactDOM.render(
    <Provider store={store}>
      <Panel />
    </Provider>,
    document.getElementById('root')
  );
}

init();
