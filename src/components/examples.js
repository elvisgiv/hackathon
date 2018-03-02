import React from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';


import MchainManage from './mchains/mchainManage'
import MchainsList from './mchains/list/mchainsList'
import AggrMchainsList from './mchains/list/aggrMchainsList'
import Exchange from './bot_balance/exchange/botExchange'


const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class Examples extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };
        //
/*        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);*/
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');
        //
        this.toggle = this.toggle.bind(this);

    }

    componentWillReceiveProps(){
        this.setState({web3Connector: this.props.web3Connector})
    }

    // for tabs
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render(){
        // for template render
        let mchainManage = <MchainManage web3Connector={this.state.web3Connector}/>;
        let mchainsList = <MchainsList/>;
        let aggrMchainsList = <AggrMchainsList/>;
        let exchange = <Exchange web3Connector={this.state.web3Connector}/>;

        return(
            <Container>
                <br/>
                <br/>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Manage Mchains
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Mchains
                            </NavLink>
                        </NavItem>
{/*                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                            >
                                Aggregation Mchains
                            </NavLink>
                        </NavItem>*/}
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}
                            >
                                Exchange
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => { this.toggle('5'); }}
                            >
                                Something Else
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="padd-30">
                                {mchainManage}
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <div className="padd-30">
                                {mchainsList}
                            </div>
                        </TabPane>
                        <TabPane tabId="3">
                            <div className="padd-30">
                                {aggrMchainsList}
                            </div>
                        </TabPane>
                        <TabPane tabId="4">
                            <div className="padd-30">
                                {exchange}
                            </div>
                        </TabPane>
                        <TabPane tabId="5">
                            <h1>Something Else Here</h1>
                        </TabPane>
                        <TabPane tabId="6">
                            <h1>Something Else Here</h1>
                        </TabPane>
                    </TabContent>
                </div>
                <br/>
                <br/>


            </Container>


        )

    }

}
