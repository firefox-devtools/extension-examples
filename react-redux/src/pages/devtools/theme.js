import { createUIStore } from 'redux-webext';
import { themeChanged } from './actions';

export default async function init() {
  const store = await createUIStore();
  // browser.devtools is only available in this or the panel
  // the popup cannot access these values directly
  browser.devtools.panels.onThemeChanged.addListener(themeName => {
    store.dispatch(themeChanged(themeName));
  });

  store.dispatch(themeChanged(browser.devtools.panels.themeName));

}
