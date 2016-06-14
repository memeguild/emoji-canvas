import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import reducers from './reducers';
import {fetchCustomEmoji} from './actions/emoji';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

const rootElement = document.querySelector('.app-container');
ReactDOM.render(<Provider store={store}><App/></Provider>, rootElement);
