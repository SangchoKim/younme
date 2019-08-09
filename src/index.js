import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
const serviceWorker = require('./serviceWorker');

ReactDOM.render(
    <React.Fragment>
        <Root />
    </React.Fragment>,
     document.getElementById('root')
     );
serviceWorker.unregister();

