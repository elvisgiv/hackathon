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

  usersPage() {
    return this.isItemSelected('/users')  || this.isItemSelected('/users/create')
  }


  render() {
    return (
      <Drawer className="sidebar" persistent open={this.state.persistentOpen}>
        <DrawerContent className="padd-top-30">


          <Link to='/users' className="undec">
            <ListItem className={"fl-cont fl-center-vert "+ (this.usersPage() ? 'selected-item' : '')}>
              <div className="fl-wrap gx-icon padd-left-10">
                <Icon strategy="ligature" className="gray-icon">group</Icon>
              </div>
              <ListItemText className="fl-wrap padd-left-md">
                Users
              </ListItemText>
            </ListItem>
          </Link>

  

        </DrawerContent>
      </Drawer>
    )
  }
}




