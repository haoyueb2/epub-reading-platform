import { createStore, applyMiddleware } from "redux";

// Logger with default options
import thunk from 'redux-thunk';

import reducer from "../reducers/book_reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];

export default function configureStore(initialState) {
    return  createStore(reducer, initialState, composeWithDevTools(
        applyMiddleware(...middleware)
    ));
}