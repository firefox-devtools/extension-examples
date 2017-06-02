import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createUIStore } from 'redux-webext';
import Popup from './components/popup';

async function init() {
  const store = await createUIStore();

  ReactDOM.render(
    <Provider store={store}>
      <Popup />
    </Provider>,
    document.getElementById('root')
  );
}

init();
