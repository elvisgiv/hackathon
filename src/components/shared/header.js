import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logos/galactic_logo_white.png';
import account_icon from '../../images/icons/account.svg';
import down_icon from '../../images/icons/down.svg';

import { MenuAnchor, Menu, MenuItem, MenuDivider, Button} from 'react-mdc-web/lib';
import {MdAccountCircle, MdKeyboardArrowDown} from 'react-icons/lib/md';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            walletConnector: {}
        };
        this.openMenu = this.openMenu.bind(this)
    }

    componentDidMount() {
    }

    openMenu(){
        this.setState({open:true})
    }


    componentWillReceiveProps(){
        if (this.props.walletConnector){
            this.setState({walletConnector: this.props.walletConnector.state})
        }
    }

    render() {
        if(!this.props.walletConnector){
            return <div>wait....</div>
        }

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
                            <div className="fl-wrap fl-grow fl-center-vert">
                                <Link to='/test' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-def">
                                        Markets
                                    </Button>
                                </Link>

                                <Link to='/test' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-transp">
                                        Help
                                    </Button>
                                </Link>

                            </div>

                            <div  className="fl-wrap  fl-center-h">
                                <div className="gx-bage fl-cont fl-center-h hand-cursor" onClick={this.openMenu}>
                                    <div className="fl-wrap gx-icon">
                                        <MdAccountCircle className="gx-icon"/>

                                    </div>
                                    <div className="fl-wrap padd-left-10">
                                        <p className="network-badge">{this.state.walletConnector.networkName}</p>
                                        <p className="no-marg account-badge">{this.state.walletConnector.ethAccounts}</p>
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
                                            <p>Balance: {this.state.walletConnector.balance} ETH</p>

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
