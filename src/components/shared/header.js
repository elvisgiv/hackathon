import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logos/galactic_logo_white.png';
import ethLogo from '../../images/icons/eth.svg';
import account_icon from '../../images/icons/account.svg';
import down_icon from '../../images/icons/down.svg';

import { MenuAnchor, Menu, MenuItem, MenuDivider, Button} from 'react-mdc-web/lib';
import {MdAccountCircle, MdKeyboardArrowDown, MdLanguage, MdAccountBalanceWallet, MdMonetizationOn, MdMenu} from 'react-icons/lib/md';

import {
    //Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    DropdownToggle,
    DropdownMenu,
    Dropdown } from 'reactstrap';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            walletConnector: {},
            openExample: false,
            isOpen: false,
            open: false,
            dropdownOpen: false
        };
        this.openMenu = this.openMenu.bind(this);
        this.openMenuExample = this.openMenuExample.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleS = this.toggleS.bind(this);
        this.toggleD = this.toggleD.bind(this);
    }

    openMenu(){
        this.setState({open:true})
    }

    openMenuExample(){
        this.setState({openExample:true})
    }

    componentWillReceiveProps(){
        if (this.props.walletConnector){
            this.setState({walletConnector: this.props.walletConnector})
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleS() {
        this.setState({
            open: !this.state.open
        });
    }

    toggleD() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {

        if(!this.state.walletConnector){
            return <div>wait....</div>
        }

        return (
            <div className="header">
                <div>
                    <Navbar color="faded" dark expand="md">
                        <NavbarBrand href="/exchange/eos">
                            <img src={logo} className="header-logo" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>

                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <Link to='/exchange/eos' className="marg-left-10">
                                        <Button className="gx-btn gx-btn-def">
                                            Exchange
                                        </Button>
                                    </Link>
                                </NavItem>
                                <NavItem >
                                    <Link to='/micropayments' className="marg-left-10">
                                        <Button className="gx-btn gx-btn-transp">
                                            Micropayments
                                        </Button>
                                    </Link>
                                </NavItem>
                                <NavItem >
                                    <Link to='/help' className="marg-left-10">
                                        <Button className="gx-btn gx-btn-transp">
                                            Help
                                        </Button>
                                    </Link>
                                </NavItem>
                                <NavItem >
                                    <Link to='/test' className="marg-left-10">
                                        <Button className="gx-btn gx-btn-transp">
                                            Test
                                        </Button>
                                    </Link>
                                </NavItem>
                                <NavItem >
                                    <Link to='/examples' className="marg-left-10">
                                        <Button className="gx-btn gx-btn-transp">
                                            Examples
                                        </Button>
                                    </Link>
                                </NavItem>
                            </Nav>

                            <Button className="gx-btn gx-btn-transp marg-ri-10">
                                <div className="fl-cont fl-center-vert">
                                    <div className="fl-wrap marg-ri-sm">
                                        <MdLanguage className="sm-icon gex-svg btn-icon"/>
                                    </div>
                                    <div className="fl-wrap gx-text-col marg-ri-sm">
                                        English
                                    </div>
                                    <div className="fl-wrap">
                                        <MdKeyboardArrowDown className="sm-icon gex-svg"/>
                                    </div>
                                </div>
                            </Button>

                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleD}>
                                <DropdownToggle>
                                    <div className="fl-cont fl-center-vert">
                                        <div className="fl-wrap gx-icon">
                                            <MdAccountCircle className="gx-icon"/>
                                        </div>
                                        <div className="fl-wrap ">
                                            <p className="network-badge">{this.state.walletConnector.networkName}</p>
                                            <p className="no-marg account-badge">{this.state.walletConnector.ethAccounts}</p>
                                        </div>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                        <h3 className="no-marg"> {this.state.walletConnector.networkName} Network</h3>
                                        <h6 className="no-marg">Connected to Web3</h6>
                                        <MdAccountBalanceWallet className="sm-icon"/>
                                        <div className="fl-wrap">
                                            {this.state.walletConnector.ethAccounts}
                                        </div>
                                        <img src={ethLogo} className="sm-icon"/>
                                        {this.state.walletConnector.balance} ETH
                                </DropdownMenu>
                            </Dropdown>

                        </Collapse>

                    </Navbar>

                </div>

            </div>

/*
                <div className="header-inner fl-cont fl-center-h" >
                    <div className="fl-wrap padd-ri-md">
                        <Link to='/exchange/eos'>
                            <img src={logo} className="header-logo" />
                        </Link>
                    </div>

                    <div className="fl-wrap fl-grow padd-left-md hidden">
                        <div className="fl-cont">
                            <div className="fl-wrap fl-grow fl-center-vert">
                                <Link to='/exchange/eos' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-def">
                                        Exchange
                                    </Button>
                                </Link>

                                <Link to='/micropayments' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-transp">
                                        Micropayments
                                    </Button>
                                </Link>

                                <Link to='/help' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-transp">
                                        Help
                                    </Button>
                                </Link>

                                <Link to='/test' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-transp">
                                        Test
                                    </Button>
                                </Link>

                                <Link to='/examples' className="marg-left-10">
                                    <Button className="gx-btn gx-btn-transp">
                                        Examples
                                    </Button>
                                </Link>

                                <Button className="gx-btn gx-btn-transp" onClick={this.openMenuExample}>
                                    <div className="fl-cont fl-center-vert">
                                        <div className="fl-wrap gx-text-col marg-ri-sm">
                                            Examples_old
                                        </div>
                                        <div className="fl-wrap">
                                            <MdKeyboardArrowDown className="sm-icon gex-svg"/>
                                        </div>
                                    </div>
                                </Button>

                                <MenuAnchor className="gx-mdc-menu">
                                    <Menu
                                        right
                                        open={this.state.openExample}
                                        onClose={()=>{this.setState({openExample:false})}}
                                    >
                                        <MenuItem>
                                            <Link to='/mchain_manage' className="marg-left-10 undec">
                                                <div className="">
                                                    Mchain manage
                                                </div>
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </MenuAnchor>
                            </div>



                            <div  className="fl-wrap  fl-center-h">


                                <Button className="gx-btn gx-btn-transp marg-ri-10">
                                    <div className="fl-cont fl-center-vert">
                                        <div className="fl-wrap marg-ri-sm">
                                            <MdLanguage className="sm-icon gex-svg btn-icon"/>
                                        </div>
                                        <div className="fl-wrap gx-text-col marg-ri-sm">
                                            English
                                        </div>
                                        <div className="fl-wrap">
                                            <MdKeyboardArrowDown className="sm-icon gex-svg"/>
                                        </div>
                                    </div>

                                </Button>


                                <div className="gx-bage fl-cont fl-center-h hand-cursor" onClick={this.openMenu}>
                                    <div className="fl-wrap gx-icon">
                                        <MdAccountCircle className="gx-icon"/>

                                    </div>
                                    <div className="fl-wrap padd-left-10">
                                        <p className="network-badge">{this.state.walletConnector.networkName}</p>
                                        <p className="no-marg account-badge">{this.state.walletConnector.ethAccounts}</p>
                                    </div>
                                    <div className="fl-wrap padd-left-10">
                                        <MdKeyboardArrowDown className="sm-icon lt-gr-svg"/>
                                    </div>

                                </div>
                                <MenuAnchor className="gx-mdc-menu">
                                    <Menu
                                        right
                                        open={this.state.open}
                                        onClose={()=>{this.setState({open:false})}}
                                    >
                                        <div className="padd-30">

                                            <div className="fl-cont fl-center-vert">
                                                <div className="fl-wrap fl-grow">
                                                    <h3 className="no-marg"> {this.state.walletConnector.networkName} Network</h3>
                                                </div>
                                                <div className="fl-wrap">
                                                    <h6 className="no-marg">Connected to Web3</h6>
                                                </div>
                                            </div>


                                            <div className="fl-cont fl-center-vert padd-top-md">
                                                <div className="fl-wrap padd-ri-10">
                                                    <MdAccountBalanceWallet className="sm-icon"/>
                                                </div>
                                                <div className="fl-wrap">
                                                    {this.state.walletConnector.ethAccounts}
                                                </div>
                                            </div>

                                            <div className="fl-cont fl-center-vert padd-top-10">
                                                <div className="fl-wrap padd-ri-10 sm-icon">
                                                    <img src={ethLogo} className="sm-icon"/>
                                                </div>
                                                <div className="fl-wrap">
                                                    {this.state.walletConnector.balance} ETH
                                                </div>
                                            </div>
                                        </div>
                                    </Menu>
                                </MenuAnchor>

                            </div>

                        </div>


                    </div>

                </div>
            </div>*/
        );
    }
}
