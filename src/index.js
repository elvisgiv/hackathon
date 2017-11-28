import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import MetamaskConnector from './components/metamask'

import { BrowserRouter } from 'react-router-dom'
import { Web3Provider } from 'react-web3';

ReactDOM.render(
    <BrowserRouter>
        <Web3Provider>
            <MetamaskConnector/>
            <App />
        </Web3Provider>
    </BrowserRouter>
  ,
    document.getElementById('root'));
registerServiceWorker();
