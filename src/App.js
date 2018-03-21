import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/web3Connector';
import Exchange from './components/exchange';
import Test from './components/test';
import Help from './components/help';
import Micropayments from './components/micropayments';
import Examples from './components/examples';
import Mchain from './components/mchains/show/mchain';
import BotExchange from './components/bot_balance/exchange/botExchange';

import Header from './components/shared/header'
import Footer from './components/shared/footer'


import { LinearProgress } from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            web3Connector: {},
            isOpen: false,
        };

        this.updateWeb3Connector = this.updateWeb3Connector.bind(this)
        this.onClickHandle = this.onClickHandle.bind(this)
    }

    updateWeb3Connector(web3Connector) {
        this.setState({web3Connector: web3Connector})
    }

    onClickHandle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let web3Connector = this.state.web3Connector;
        let content;

        //console.log(web3Connector)

        if (!web3Connector.provider) {
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
                <div className="cont wrapper">
                    <Header walletConnector={web3Connector} callbackFromApp={this.onClickHandle}
                            isOpenFromApp={this.state.isOpen}/>

                    <div className="page-content">
                        <Switch>
                            <Route exact path='/' component={Exchange}/>
                            <Route exact path='/exchange/:symbol' component={Exchange}/>
                            <Route path='/test'  render={() => <Test web3Connector={web3Connector} />} />
                            <Route path='/help' component={Help}/>
                            <Route path='/micropayments' component={Micropayments}/>
                            <Route path='/examples' render={() => <Examples web3Connector={web3Connector} />} />
                            <Route path='/bot_exchange' render={() => <BotExchange web3Connector={web3Connector} />} />
                            <Route exact path='/mchains/:name' render={(props) => <Mchain web3Connector={web3Connector} props={props}/>} />
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



