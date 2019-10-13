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
        {process.env.NODE_ENV === 'production'
          && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
    </React.Fragment>,
     document.getElementById('root')
     
     );
serviceWorker.unregister();

