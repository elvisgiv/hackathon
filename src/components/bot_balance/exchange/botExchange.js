import React from 'react'
import {Link} from 'react-router-dom'

import { Button } from 'rmwc/Button';


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
        this.setState({web3Connector: this.props.web3Connector});
        this.checkBalances()
    }

    // balance
    async checkBalances() {
        // from metamask
        let accounts = await gex.w3.getAccounts();
        // in wei
        let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        let firstAccountEthBalance = await gex.w3.web3.eth.getBalance(accounts[0]);
        // from wei
        let skl = gex.w3.web3.utils.fromWei(firstAccountBalance);
        let eth = gex.w3.web3.utils.fromWei(firstAccountEthBalance);
        //
        this.setState({skl: skl, eth: eth});
        // from skalebot
        let accountInfo = await gex.bot().getInfoForAccount(accounts[0]);

        this.setState({
            botEth: gex.w3.web3.utils.fromWei(accountInfo.sendEth),
            botSkale: gex.w3.web3.utils.fromWei(accountInfo.sendGex),
        });
    }


    ///////////////////////////
    render(){

        let returnEth = <ReturnEth web3Connector={this.state.web3Connector}/>;
        let returnSkl = <ReturnSkl web3Connector={this.state.web3Connector}/>;

        return(
            <div className='container'>
                <br/>
                <br/>
                <br/>
                <h2 className="bold no-marg text-center" >Your balance:</h2>

                <Row>

                    <Col sm="6" className="text-center">
                        <div>
                            <br/>
                            <br/>
                            <h4 className="bold no-marg" >from MetaMask:</h4>
                            <br/>
                            <p>
                                <strong>ETH:</strong> {this.state.eth}
                                <br/>
                                <Link to='/buy-eth' className="undec">
                                    <Button raised>Buy ETH</Button>
                                </Link>
                            </p>

                            <p>
                                <strong>SKL:</strong> {this.state.skl}
                                <br/>
                                <Link to='/buy-skl' className="undec">
                                    <Button raised>Buy SKL</Button>
                                </Link>
                            </p>
                        </div>
                    </Col>

                    <Col sm='6' className="text-center">
                        <div>
                            <br/>
                            <br/>
                            <h4 className="bold no-marg" >From SkaleBot:</h4>
                            <br/>
                            <p>
                                <strong>ETH:</strong> {this.state.botEth}
                                <br/>
                                {returnEth}
                            </p>

                            <p>
                                <strong>SKL:</strong> {this.state.botSkale}
                                <br/>
                                {returnSkl}
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>


        )

    }

}
