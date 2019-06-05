import App from './App';
//must import app container where it is rendered
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter} from 'react-router-dom';
import {persistStore, persistCombineReducers} from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
const Root = ({ store }) => (
    <Provider store={ store }>
        <HashRouter>
            <PersistGate persistor={persistStore(store)}>
                <App />
            </PersistGate>

        </HashRouter>
    </Provider>
);

export default Root;
