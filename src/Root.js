import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import configureStore from './configureStore'; //export default function configureStore(persistedState) // store init constractor

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
}

export default Root;
