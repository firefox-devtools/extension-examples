import { createStore, applyMiddleware } from 'redux';
import { createBackgroundStore } from 'redux-webext';
import middlewares from './middlewares';
import reducers from './reducers';
import { theme } from './actions/theme';

const store = createStore(reducers, applyMiddleware(...middlewares));

export default createBackgroundStore({
  store,
  actions: {
    ['PANEL_SET_LIGHT_THEME']: theme,
    ['POPUP_SET_DARK_THEME']: theme,
    ['DEVTOOLS_THEME_CHANGED']: theme,
  },
  onDisconnect() {},
});
