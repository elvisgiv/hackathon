import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logos/galactic_logo_white.png';
import account_icon from '../../images/icons/account.svg';
import down_icon from '../../images/icons/down.svg';

import { MenuAnchor, Menu, MenuItem, MenuDivider} from 'react-mdc-web/lib';
import {MdAccountCircle, MdKeyboardArrowDown} from 'react-icons/lib/md';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.openMenu = this.openMenu.bind(this)
    }

    componentDidMount() {
    }

    openMenu(){
        this.setState({open:true})
    }

    render() {
        return (
            <div className="header">
                <div className="header-inner fl-cont fl-center-h" >
                    <div className="fl-wrap padd-ri-md">
                        <Link to='/exchange'>
                            <img src={logo} className="header-logo" />
                        </Link>
                    </div>

                    <div className="fl-wrap fl-grow padd-left-md hidden">
                        <div className="fl-cont">
                            <div className="fl-wrap fl-grow ">
                                <Link to='/test'>
                                    Test
                                </Link>
                            </div>

                            <div  className="fl-wrap  fl-center-h">
                                <div className="gx-bage fl-cont fl-center-h hand-cursor" onClick={this.openMenu}>
                                    <div className="fl-wrap gx-icon">
                                        <MdAccountCircle className="gx-icon"/>

                                    </div>
                                    <div className="fl-wrap padd-left-10">
                                        <p className="network-badge">MAINNET</p>
                                        <p className="no-marg account-badge">0x45647896546786754</p>
                                    </div>
                                    <div className="fl-wrap padd-left-10  gx-icon">
                                        <MdKeyboardArrowDown className="gx-icon"/>
                                    </div>

                                </div>
                                <MenuAnchor className="gx-mdc-menu">
                                    <Menu
                                        right
                                        open={this.state.open}
                                        onClose={()=>{this.setState({open:false})}}
                                    >
                                        <div>
                                            <MdAccountCircle className="gx-icon"/>
                                            <MdAccountCircle className="gx-icon"/>
                                            <MdAccountCircle className="gx-icon"/>
                                        </div>

                                    </Menu>
                                </MenuAnchor>

                            </div>

                        </div>


                    </div>

                </div>
            </div>
        );
    }
}
