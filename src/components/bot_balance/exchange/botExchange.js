import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'rmwc/Button';
import { Container, Col, } from 'reactstrap';
//
import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";
//
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
        //
        this.setState({
            skl: gex.w3.web3.utils.fromWei(firstAccountBalance),
            eth: gex.w3.web3.utils.fromWei(firstAccountEthBalance)
        });

        // from skalebot
        let accountInfo = await gex.bot().getInfoForAccount(accounts[0]);
        //
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
                <h2 className="bold no-marg" >Your balance</h2>
                <br/>

                <div className="mdc-elevation--z4 padd-top-10 padd-left-big"  style={{width: '40%'}}>
                    <div>
                        <br/>
                        <h4 className="bold no-marg" >from MetaMask:</h4>
                        <br/>
                        <span style={{'font-weight':'bold'}}>ETH: </span>
                        {this.state.eth}
                        <br/>
                        <Link to='/exchange-eth' className="undec">
                            <Button dense>Buy ETH</Button>
                        </Link>
                        <br/>
                        <br/>
                        <span style={{'font-weight':'bold'}}>SKL: </span>
                        {this.state.skl}
                        <br/>
                        <Link to='/exchange-skl' className="undec">
                            <Button dense>Buy SKL</Button>
                        </Link>
                        <br/>
                        <br/>
                    </div>
                </div>
                <br/>
                <div className="mdc-elevation--z4 padd-top-10 padd-left-big"  style={{width: '40%'}}>

                    <div>
                        <br/>
                        <h4 className="bold no-marg" >from SkaleBot:</h4>
                        <br/>
                        <span style={{'font-weight':'bold'}}>ETH:</span>
                        {this.state.botEth}
                        <br/>
                        {returnEth}
                        <br/>
                        <br/>
                        <span style={{'font-weight':'bold'}}>SKL:</span>
                        {this.state.botSkale}
                        <br/>
                        {returnSkl}
                        <br/>
                        <br/>
                    </div>
                </div>

            </div>


        )

    }

}
