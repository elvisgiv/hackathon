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
    return this.isItemSelected('/schains')  || this.isItemSelected('/schains/create')
  }

  walletPage() {
    return this.isItemSelected('/wallet') || this.isItemSelected('/')
  }

/*  marketPage() {
    return this.isItemSelected('/marketplace') || this.isItemSelected('/sell-skl') || this.isItemSelected('/buy-skl')
  }*/

  render() {
    return (
      <Drawer className="sidebar" persistent open={this.state.persistentOpen}>
        <DrawerContent className="padd-top-30">
          <Link to='/wallet' className="undec">
              <ListItem className={"fl-cont fl-center-vert "+ (this.walletPage() ? 'selected-item' : '')}>
                  <div className="fl-wrap gx-icon padd-left-10">
                      <Icon strategy="ligature" className="gray-icon">account_balance_wallet</Icon>
                  </div>
                  <ListItemText className="fl-wrap padd-left-md">
                      Wallet
                  </ListItemText>
              </ListItem>
          </Link>

{/*          <Link to='/marketplace' className="undec">
              <ListItem className={"fl-cont fl-center-vert "+ (this.marketPage() ? 'selected-item' : '')}>
                  <div className="fl-wrap gx-icon padd-left-10">
                      <Icon strategy="ligature" className="gray-icon">shopping_cart</Icon>
                  </div>
                  <ListItemText className="fl-wrap padd-left-md">
                      Marketplace
                  </ListItemText>
              </ListItem>
          </Link>*/}

          <Link to='/schains' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.sChainsPage() ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">group_work</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                S-chains
              </ListItemText>
            </ListItem>
          </Link>

          <Link to='/spanding-list' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/spanding-list') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">pregnant_woman</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                  Pending S-chains
              </ListItemText>
            </ListItem>
          </Link>

{/*          <Link to='/dapps' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/dapps') || this.isItemSelected('/dapps/upload') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">extension</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                dApps
              </ListItemText>
            </ListItem>
          </Link>*/}

          <Link to='/reporting' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/reporting') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">assessment</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                Reporting
              </ListItemText>
            </ListItem>
          </Link>

          <Link to='/logs' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.isItemSelected('/logs') ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">assignment</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                Logs
              </ListItemText>
            </ListItem>
          </Link>

        </DrawerContent>
      </Drawer>
    )
  }
}




