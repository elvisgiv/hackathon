import React from 'react'
import {Link} from 'react-router-dom'

import {Icon} from 'rmwc/Icon';
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

import logo from '../../images/logos/logo.png';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      persistentOpen: true
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar(){
    this.setState({persistentOpen: !this.state.persistentOpen})
  }

  isItemSelected(url) {
    return window.location.pathname === url;
  }

  sChainsPage() {
    return this.isItemSelected('/schains') || this.isItemSelected('/') || this.isItemSelected('/schains/create')
  }

  walletPage() {
    return this.isItemSelected('/wallet') || this.isItemSelected('/exchange-eth') || this.isItemSelected('/exchange-skl')
  }

  render() {
    return (
      <Drawer className="sidebar" persistent open={this.state.persistentOpen}>

        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle className="no-padd no-marg">
                <Link to='/' className="undec">
                  <img src={logo} className="header-logo"/>
                </Link>
              </ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <DrawerContent className="padd-top-md">

          <Link to='/wallet' className="undec">
              <ListItem className={"fl-cont fl-center-vert "+ (this.walletPage() ? 'selected-item' : '')}>
                  <div className="fl-wrap gx-icon">
                      <Icon strategy="ligature" className="orange-col">account_balance_wallet</Icon>
                  </div>
                  <ListItemText className="fl-wrap padd-left-10">
                      Wallet
                  </ListItemText>
              </ListItem>
          </Link>

          <Link to='/schains' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.sChainsPage() ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon">
                <Icon strategy="ligature" className="blue-col">group_work</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-10">
                sChains
              </ListItemText>
            </ListItem>
          </Link>

          <Link to='/dapps' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/dapps') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon">
                <Icon strategy="ligature" className="cyan-col">extension</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-10">
                dApps
              </ListItemText>
            </ListItem>
          </Link>

          <Link to='/management' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/management') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon">
                <Icon strategy="ligature" className="green-col">view_carousel</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-10">
                Management
              </ListItemText>
            </ListItem>
          </Link>

          <Link to='/logs' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/logs') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon">
                <Icon strategy="ligature" className="purple-col">assignment</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-10">
                Logs
              </ListItemText>
            </ListItem>
          </Link>

        </DrawerContent>
      </Drawer>
    )
  }
}




