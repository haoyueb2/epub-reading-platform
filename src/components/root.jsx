import App from './App';
//must import app container where it is rendered
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter} from 'react-router-dom';

const Root = ({ store }) => (


        <HashRouter>
            <App />
        </HashRouter>

);

export default Root;
