import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/containers/web3Connector';
import Header from "./components/shared_components/Header";
import Sidebar from './components/shared_components/Sidebar';
import Web3Connection from './components/shared_components/Web3Connection';


import User from './components/pages/User';
import Users from './components/pages/Users';
import CreateUser from './components/pages/CreateUser';

import Test from './components/pages/Test';

import 'material-components-web/dist/material-components-web.min.css';

const jsonCustom = require('./abi.json');


const Identicon = require('identicon.js');

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const ROUTES = {
    '/': {title: 'Users'},
    '/users': {title: 'Users'},
    '/users/create': {title: 'Create User'},
};


export default class App extends Component {

    constructor(props) {
        super(props);

        this.prevLocation = window.location.pathname;
        this.state = {
            web3Connector: {},
            pageTitle: this.getPageTitle()
        };

        this.updateWeb3Connector = this.updateWeb3Connector.bind(this);
    }

    updateWeb3Connector(web3Connector) {
        this.setState({web3Connector: web3Connector});

        if (web3Connector) {
            if (!this.state.libInit) {
                web3
                this.setState({libInit: true});
            }
            if (this.state.libInit) {
                // this.initAvatarData();
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (window.location.pathname !== this.prevLocation) {
            this.prevLocation = window.location.pathname;
            this.setState({pageTitle: this.getPageTitle()})
        }
    }

    getPageTitle() {
        return ROUTES[this.prevLocation] ? ROUTES[this.prevLocation].title : 'Page not found';
    }

    changeTitle(title) {
        this.setState({pageTitle: title})
    }

    toggleSidebar() {
        this.persistentOpen = this.persistentOpen === undefined ? false : !this.persistentOpen;
    }

    // async initAvatarData() {
    //     let accounts = await skale.w3.getAccounts();
    //     let account = accounts[0];
    //     this.setState({
    //         avatarData: new Identicon(account, {
    //             margin: 0.22,
    //             size: 35,
    //             background: [216, 216, 216, 255],
    //             brightness: 0.4,
    //             saturation: 1
    //         }).toString()
    //     });
    // }

    render() {
        let web3Connector = this.state.web3Connector;
        let content;
        if (!web3Connector.provider) {
            content = <Web3Connection/>;
        }
        else {
            content = (
                <div>
                    <Header avatarData={this.state.avatarData}/>
                    <div className="fl-cont">
                        <div className="fl-wrap">
                            <Sidebar ref="sidebar" persistentOpen={this.persistentOpen}/>
                        </div>
                        <div className="fl-wrap fl-grow main-content">
                            <div className="skale-page-content">
                                <Switch>
                                    <Route exact path='/' render={() => <Wallet web3Connector={web3Connector}/>}/>
                                    <Route exact path='/users'
                                           render={() => <Users web3Connector={web3Connector}/>}/>
                                    <Route exact path='/users/create'
                                           render={() => <CreateUser web3Connector={web3Connector}/>}/>


                                    <Route path='/test' render={() => <Test web3Connector={web3Connector}/>}/>

                                    <Route exact path='/users/:name'
                                           render={(props) => <User web3Connector={web3Connector} props={props}/>}/>


                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }


        return (
            <div className="App">
                <Web3Connector updateWeb3Connector={this.updateWeb3Connector}/>
                {content}
            </div>
        );
    }
}



