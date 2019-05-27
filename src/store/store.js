import { createStore, applyMiddleware } from "redux";

// Logger with default options
import thunk from 'redux-thunk';

import rootReducer  from '../reducers/root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];

export default function configureStore(initialState) {
    return  createStore(rootReducer, initialState, composeWithDevTools(
        applyMiddleware(...middleware)
    ));
}