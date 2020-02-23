import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './css/index.css';
import App from './App';
import {PlayControl} from "./utils/PlayControl";

const control:PlayControl = PlayControl.getInstance();
control.setStore( store );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
);
