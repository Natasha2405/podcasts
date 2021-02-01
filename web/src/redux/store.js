// vendor imports
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
// reducers
import reducers from './ducks';

export default createStore(reducers, applyMiddleware(createLogger()));