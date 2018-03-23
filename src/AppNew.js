import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/web3Connector';
import Sidebar from './components/skale/sidebar';

import Micropayments from './components/micropayments';
import Logs from './components/skale/logs';
import Management from './components/skale/management';
import Dapps from './components/skale/dapps';

import Mchain from './components/mchains/show/mchain';
import SChains from './components/skale/sChains';
import CreateSChain from './components/mchains/create/createMchain';

// for wallet
import BotExchange from './components/bot_balance/exchange/botExchange';
import FromEth from './components/bot_balance/exchange/fromEth';
import FromSkale from './components/bot_balance/exchange/fromSkale';






import 'material-components-web/dist/material-components-web.min.css';

import { Icon } from 'rmwc/Icon';
import { LinearProgress } from 'rmwc/LinearProgress';

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';


const ROUTES = {
  '/': {title: 'sChains'},
  '/schains': {title: 'sChains'},
  '/schains/create': {title: 'Create sChain'},
  '/wallet': {title: 'Wallet'},
  '/management': {title: 'Management'},
  '/logs': {title: 'Logs'},
  '/dapps': {title: 'dApps'},
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
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (window.location.pathname !== this.prevLocation) {
      this.prevLocation = window.location.pathname;
      this.setState({pageTitle: this.getPageTitle()})
    }
  }

  getPageTitle(){
    return ROUTES[this.prevLocation] ? ROUTES[this.prevLocation].title : 'Page not found';
  }

  changeTitle(title) {
    this.setState({pageTitle: title})
  }

  toggleSidebar() {
    this.persistentOpen = this.persistentOpen === undefined ? false : !this.persistentOpen;
  }

  render() {
    let web3Connector = this.state.web3Connector;
    let content;
    if (!web3Connector.provider) {
      content = (
        <div className="cont fl-cont fl-center" style={{height: "calc(100vh - 65px)", textAlign: "center"}}>
          <div className="fl-wrap fl-grow">
            <h2>Connecting to the Web3</h2>
            <h6 className="padd-bott-md lite-gr-col" style={{    lineHeight: "1.6"}}>
              Please note that Metamask plugin should be installed in order to use this application. <br/>
              If you're seeing this more than a few seconds, probably you don't.
            </h6>
            <div style={{width: "340px", margin: "auto"}}>
              <LinearProgress determinate={false}></LinearProgress>
            </div>
          </div>
        </div>
      )
    }
    else {
      content = (

        <div>
          <div className="fl-cont">
            <div className="fl-wrap">
              <Sidebar ref="sidebar" persistentOpen={this.persistentOpen}/>
            </div>
            <div className="fl-wrap fl-grow main-content">
              <Toolbar>
                <ToolbarRow>
                  <ToolbarSection alignStart>
                    <ToolbarMenuIcon use="menu" onClick={() => this.refs.sidebar.toggleSidebar()}/>
                    <ToolbarTitle>{this.state.pageTitle}</ToolbarTitle>
                  </ToolbarSection>
                  <ToolbarSection alignEnd>
                    <div className="fl-wrap gx-icon marg-ri-10">
                      <Icon strategy="ligature" className="white-col">account_circle</Icon>
                    </div>
                  </ToolbarSection>
                </ToolbarRow>
              </Toolbar>

              <div className="skale-page-content">
                <Switch>
                  <Route exact path='/' render={() => <SChains web3Connector={web3Connector} />} />
                  <Route exact path='/schains' render={() => <SChains web3Connector={web3Connector} />} />
                  <Route exact path='/schains/create' render={() => <CreateSChain web3Connector={web3Connector}/>}/>

                  <Route exact path='/logs' render={() => <Logs web3Connector={web3Connector}/>}/>
                  <Route exact path='/management' render={() => <Management web3Connector={web3Connector}/>}/>
                  <Route exact path='/dapps' render={() => <Dapps web3Connector={web3Connector}/>}/>

                  <Route path='/wallet' render={() => <BotExchange web3Connector={web3Connector} />} />
                  <Route path='/buy-eth' render={() => <FromSkale web3Connector={web3Connector} />} />
                  <Route path='/buy-skl' render={() => <FromEth web3Connector={web3Connector} />} />

                  <Route path='/micropayments' component={Micropayments}/>

                  <Route exact path='/mchains/:name' render={(props) => <Mchain web3Connector={web3Connector} props={props}/>} />
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



