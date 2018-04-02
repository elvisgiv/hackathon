import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/web3Connector';
import Header from "./components/shared_components/header";
import Sidebar from './components/shared_components/sidebar';
import Web3Connection from './components/shared_components/web3Connection';

import Logs from './components/pages/Logs';
import Reporting from './components/pages/Reporting';
import Dapps from './components/pages/DApps';
import UploadDapp from './components/page_components/dapps/UploadDApp';

import SChain from './components/pages/SChain';
import SChains from './components/pages/SChains';
import CreateSChain from './components/pages/CreateSChain';

// for wallet
import BotExchange from './components/pages/Wallet';
import FromEth from './components/page_components/maketplace/FromEth';
import FromSkale from './components/page_components/maketplace/FromSkale';
//
import Marketplace from "./components/pages/Marketplace";

import 'material-components-web/dist/material-components-web.min.css';
const Identicon = require('identicon.js');

const skale = require('@skale-labs/skale-api');

const ROUTES = {
  '/': {title: 'sChains'},
  '/schains': {title: 'sChains'},
  '/schains/create': {title: 'Create sChain'},
  '/wallet': {title: 'Wallet'},
  '/reporting': {title: 'Reporting'},
  '/logs': {title: 'Logs'},
  '/exchange-eth': {title: 'Exchange ETH'},
  '/exchange-skl': {title: 'Exchange SKL'},
  '/dapps': {title: 'dApps'},
  '/dapps/upload': {title: 'Upload Dapp'},
  '/marketplace': {title: 'Marketplace'},
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
      if(!this.state.libInit){
        skale.initBothProviders('51.0.1.99', '8546', web3Connector.provider);
        this.setState({libInit: true});
      }
      if(this.state.libInit) {
        this.initAvatarData();
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

  async initAvatarData() {
    let accounts = await skale.w3.getAccounts();
    let account = accounts[0];
    this.setState({
      avatarData: new Identicon(account, {margin: 0.22, size: 35, background:  [216, 216, 216, 255], brightness: 0.4, saturation: 1}).toString()
    });
  }

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
                  <Route exact path='/' render={() => <SChains web3Connector={web3Connector}/>}/>
                  <Route exact path='/schains' render={() => <SChains web3Connector={web3Connector}/>}/>
                  <Route exact path='/schains/create' render={() => <CreateSChain web3Connector={web3Connector}/>}/>

                  <Route exact path='/logs' render={() => <Logs web3Connector={web3Connector}/>}/>
                  <Route exact path='/reporting' render={() => <Reporting web3Connector={web3Connector}/>}/>
                  <Route exact path='/dapps' render={() => <Dapps web3Connector={web3Connector}/>}/>

                  <Route path='/wallet' render={() => <BotExchange web3Connector={web3Connector}/>}/>
                  <Route path='/exchange-eth' render={() => <FromSkale web3Connector={web3Connector}/>}/>
                  <Route path='/exchange-skl' render={() => <FromEth web3Connector={web3Connector}/>}/>
                  <Route path='/dapps/upload' render={() => <UploadDapp web3Connector={web3Connector}/>}/>
                  <Route path='/marketplace' render={() => <Marketplace web3Connector={web3Connector}/>}/>

                  <Route exact path='/mchains/:name'
                         render={(props) => <SChain web3Connector={web3Connector} props={props}/>}/>
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



