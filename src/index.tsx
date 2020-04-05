import React from 'react';
import ReactDOM from 'react-dom';
import './theme/index.scss';
import App from './components/app';
import AppFooter from './components/layout/footer';
import AppHeader from './components/layout/header';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <AppHeader />
        <App/>
        <AppFooter />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
