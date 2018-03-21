import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'

import Web3Connector from './components/web3Connector';
import Test from './components/test';
import Help from './components/help';
import Micropayments from './components/micropayments';
import Examples from './components/examples';
import Mchain from './components/mchains/show/mchain';

import Header from './components/shared/header'
import Footer from './components/shared/footer'

import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer';
//import '@material/drawer/mdc-drawer.scss';

//import {MDCPersistentDrawer} from '@material/drawer';

//import {LinearProgress} from 'react-mdc-web/lib';
//import 'material-components-web/dist/material-components-web.min.css';
import 'material-components-web/dist/material-components-web.min.css';
//import {MDCRipple} from '@material/ripple';

import logo from './images/logos/logo.png';

import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText
} from 'rmwc/List';

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

import { Button } from 'rmwc/Button';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3Connector: {}
    };
    this.updateWeb3Connector = this.updateWeb3Connector.bind(this)
  }

  updateWeb3Connector(web3Connector) {
    this.setState({web3Connector: web3Connector});
  }

  componentDidMount() {

  }

  render() {
    let web3Connector = this.state.web3Connector;
    let content;

    //console.log(web3Connector)

    if (!web3Connector.provider) {
      content = (
        <div className="cont fl-cont fl-center" style={{height: "calc(100vh - 65px)", textAlign: "center"}}>
          <div className="fl-wrap fl-grow">
            <h1>Connecting to the Web3!!!</h1>
            <div style={{width: "340px", margin: "auto"}}>
              {/*<LinearProgress indeterminate/>*/}
            </div>
          </div>
        </div>
      )
    }
    else {
      content = (

        <div>

          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>

                <ToolbarTitle className="no-padd">
                  <img src={logo} className="header-logo" />
                </ToolbarTitle>
                <ToolbarMenuIcon use="menu" onClick={() => this.setState({persistentOpen: this.state.persistentOpen === undefined ? false : !this.state.persistentOpen})}/>


              </ToolbarSection>
              <ToolbarSection alignEnd>
                <ToolbarIcon use="save" />
                <ToolbarIcon use="print"/>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>

          <div className="fl-cont">
            <div className="fl-wrap">
              <Drawer persistent open={this.state.persistentOpen == undefined ? true : this.state.persistentOpen}>
                <DrawerHeader>
                  <h1>fg</h1>
                </DrawerHeader>
                <DrawerContent>
                  <ListItem>
                    <ListItemText>Cookies</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Pizza</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Icecream</ListItemText>
                  </ListItem>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="fl-wrap fl-grow">
              test
            </div>
          </div>




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



