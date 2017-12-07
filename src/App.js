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


    constructor(props){
        super(props);
        this.state = {walletConnector: {}}
        this.updateWalletConnector = this.updateWalletConnector.bind(this)
    }

    updateWalletConnector(walletConnector){
        this.setState({walletConnector: walletConnector})
    }

  render() {

    let walletConnector = this.state.walletConnector;


    let content = <div></div>

    if(!walletConnector.web3connection){
         content = (
             <div className="cont fl-center" style={{height: "calc(100vh - 65px)", textAlign: "center"}}>
                <h1>Connecting to the Web3</h1>
            </div>
         )
    }
    else{
        content = (
            <div className="cont">
                <Header walletConnector={walletConnector}/>
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
        )
    }

    return (
      <div className="App">
          <WalletConnector updateWalletConnector={this.updateWalletConnector}/>
          {content}
      </div>
    );
  }
}



