import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducer'
import thunk from 'redux-thunk';
// imoprt {composeWithDevTools} from 'redux-devtools-extension'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))