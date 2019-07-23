import React from 'react';
import { BrowserRouter }  from'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/App';
import store from '../store';

// const store = createStore();

const Root = () => (
    <BrowserRouter> 
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

export default Root;