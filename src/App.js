import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/web3Connector';
import Exchange from './components/exchange';
import Test from './components/test';
import Help from './components/help';
import Micropayments from './components/micropayments';
import MchainManage from './components/mchainManage';
import Examples from './components/examples';

import Header from './components/shared/header'
import Footer from './components/shared/footer'


import { LinearProgress } from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            web3Connector: {}
        };
        this.updateWeb3Connector = this.updateWeb3Connector.bind(this)
    }

    updateWeb3Connector(web3Connector) {
        this.setState({web3Connector: web3Connector})
    }

    render() {
        let web3Connector = this.state.web3Connector;
        let content;

        console.log(web3Connector)

        if (!web3Connector.web3) {
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
                    <Header walletConnector={web3Connector}/>
                    <div className="page-content">
                        <Switch>
                            <Route exact path='/' component={Exchange}/>
                            <Route exact path='/exchange/:symbol' component={Exchange}/>
                            <Route path='/test' component={Test} web3Connector={web3Connector}/>
                            <Route path='/help' component={Help}/>
                            <Route path='/micropayments' component={Micropayments}/>
                            <Route path='/mchain_manage' component={MchainManage}/>
                            <Route path='/examples' component={Examples}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            )
        }

        return (
            <div className="App">
                <Web3Connector updateWeb3Connector={this.updateWeb3Connector}/>
                {content}
            </div>
        );
    }
}



