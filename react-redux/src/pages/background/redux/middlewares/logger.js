import { createLogger } from 'redux-logger';

let middleware;

if (process.env.NODE_ENV === 'development') {
  middleware = createLogger({ collapsed: true });
} else {
  // this is an empty middleware that just passes things on
  middleware = () => next => action => next(action);
}

export default middleware;
