import store from './redux/store';
import { theme } from './redux/actions/theme';

export default function init() {
  browser.commands.onCommand.addListener(command => {
    if (command === 'SetAsDefault') {
      return store.dispatch(theme({ name: 'default' }));
    }
  });
}
