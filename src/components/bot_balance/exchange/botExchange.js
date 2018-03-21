import React from 'react'

import { Row, Col, } from 'reactstrap';
import FromEth from './fromEth';
import FromSkale from './fromSkale';
//import AccountInfo from './accountInfo';
import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";
const gex = require('@skale-labs/skale-api');


export default class BotExchange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skl: '',
            eth: '',

        };
        //
        this.checkBalances =this.checkBalances.bind(this)
    }

    componentWillReceiveProps(){
        this.setState({web3Connector: this.props.web3Connector})
        this.checkBalances()
    }

    // balance
    async checkBalances() {
        let accounts = await gex.w3.getAccounts();
        // in wei
        let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        let firstAccountEthBalance = await gex.w3.web3.eth.getBalance(accounts[0]);
        // from wei
        let skl = gex.w3.web3.utils.fromWei(firstAccountBalance);
        let eth = gex.w3.web3.utils.fromWei(firstAccountEthBalance);
        //
        this.setState({skl: skl, eth: eth});
    }


    ///////////////////////////
    render(){

        // for template render
        let exchangeEth = <FromEth web3Connector={this.state.web3Connector}/>;
        let exchangeSkale = <FromSkale web3Connector={this.state.web3Connector}/>;
        //let accountInfo = <AccountInfo web3Connector={this.state.web3Connector}/>;
        let returnEth = <ReturnEth web3Connector={this.state.web3Connector}/>;
        let returnSkl = <ReturnSkl web3Connector={this.state.web3Connector}/>;

        return(
            <div className='container'>
                <div>
                    <h4 className="bold no-marg" >Your balance:</h4>
                    <br/>
                    <p>
                        <strong>ETH:</strong> {this.state.eth}
                    </p>
                    <p>
                        <strong>SKL:</strong> {this.state.skl}
                    </p>
                </div>
                <Row>
                    <Col sm="12">
                        <h1 className="bold text-center" >Exchange</h1>
                        <br/>
                        <Row>
                            <Col sd={5}>
                                {exchangeEth}
                            </Col>

                            <Col sd={2}></Col>

                            <Col sd={5}>
                                {exchangeSkale}
                            </Col>
                            {/*<Col sd={4}>
                                {accountInfo}
                            </Col>*/}
                        </Row>
                        <h1 className="bold text-center" >Reminder</h1>
                        <h4 className="bold text-center" >(the exchange closes at 00:00 in pacific time)</h4>
                        <br/>
                        <Row>
                            <Col sd={5}>
                                {returnSkl}
                            </Col>

                            <Col sd={2}></Col>

                            <Col sd={5}>
                                {returnEth}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>



        )

    }

}
