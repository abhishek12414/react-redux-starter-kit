import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

global.log = (...msgs) => {
	(process.env.NODE_ENV === 'development') && console.log(...msgs)
}

const app = <Provider store={store}><App /></Provider>

ReactDOM.render(app, document.getElementById('app'));
