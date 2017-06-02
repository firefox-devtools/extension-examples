import logger from './logger';

// You can add other middleware here but be carefule because order matters.
const middlewares = [logger];

export default middlewares;
