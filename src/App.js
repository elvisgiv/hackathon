import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'

import WalletConnector from './components/wallet_connector'; // todo: remove it
import Web3Connector from './components/web3Connector';
import Exchange from './components/exchange';
import Test from './components/test';
import Help from './components/help';
import Micropayments from './components/micropayments';
import MchainManage from './components/mchain_manage';

import Header from './components/shared/header'
import Footer from './components/shared/footer'


import { LinearProgress } from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            walletConnector: {},
            web3Connector: {}
        }
        this.updateWalletConnector = this.updateWalletConnector.bind(this)
        this.updateWeb3Connector = this.updateWeb3Connector.bind(this)
    }

    updateWalletConnector(walletConnector) {
        this.setState({walletConnector: walletConnector})
    }

    updateWeb3Connector(web3Connector) {
        this.setState({web3Connector: web3Connector})
    }

    render() {

        let walletConnector = this.state.walletConnector;
        let content;

        if (!walletConnector.web3connection) {
            content = (
                <div className="cont fl-cont fl-center" style={{height: "calc(100vh - 65px)", textAlign: "center"}}>
                    <div className="fl-wrap fl-grow">
                        <h1>Connecting to the Web3</h1>
                        <div style={{width: "340px", margin: "auto"}}>
                            <LinearProgress indeterminate/>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            content = (
                <div className="cont">
                    <Header walletConnector={walletConnector}/>
                    <div className="page-content">
                        <Switch>
                            <Route exact path='/' component={Exchange}/>
                            <Route exact path='/exchange/:symbol' component={Exchange}/>
                            <Route path='/test' component={Test}/>
                            <Route path='/help' component={Help}/>
                            <Route path='/micropayments' component={Micropayments}/>
                            <Route path='/mchain_manage' component={MchainManage}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            )
        }

        return (
            <div className="App">
                <WalletConnector updateWalletConnector={this.updateWalletConnector}/>
                <Web3Connector updateWalletConnector={this.updateWeb3Connector}/>
                {content}
            </div>
        );
    }
}



