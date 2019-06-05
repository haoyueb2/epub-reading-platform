import { createStore, applyMiddleware } from "redux";

// Logger with default options
import thunk from 'redux-thunk';

import rootReducer  from '../reducers/root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage'
const middleware = [thunk];

const config = {
    key: 'root',
    storage,
};
let reducer = persistReducer(config, rootReducer);

export default function configureStore() {
    return  createStore(reducer, composeWithDevTools(
        applyMiddleware(...middleware)
    ));
}