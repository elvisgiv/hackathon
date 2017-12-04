import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom'

import WalletConnector from './components/wallet_connector';
import Exchange from './components/exchange';
import Test from './components/test';
import Help from './components/help';

import Header from './components/shared/header'
import Footer from './components/shared/footer'

import 'material-components-web/dist/material-components-web.min.css';

export default class App extends Component {

  render() {

    return (
      <div className="App">
          <Header walletConnector={this.walletConnector}/>

          <WalletConnector ref={instance => { this.walletConnector = instance; }}/>

          <div className="page-content">
              <Switch>
                  <Route exact path='/' component={Exchange}/>
                  <Route exact path='/exchange/:symbol' component={Exchange}/>
                  <Route path='/test' component={Test} />
                  <Route path='/help' component={Help} />
              </Switch>
          </div>

          <Footer/>
      </div>
    );
  }
}



