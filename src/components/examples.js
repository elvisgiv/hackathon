import React from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';


import MchainManage from './mchains/mchainManage'
import MchainsList from './mchains/list/mchainsList'
import AggrMchainsList from './mchains/list/aggrMchainsList'


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class Examples extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //
        this.toggle = this.toggle.bind(this);

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
        let mchainManage = <MchainManage/>;
        let mchainsList = <MchainsList/>;
        let aggrMchainsList = <AggrMchainsList/>;

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
                                Mchains Manage
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
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                            >
                                Aggregation Mchains
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}
                            >
                                Wallet Balance
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
                            </div>                        </TabPane>
                        <TabPane tabId="4">
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
