import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class AccountInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
        };
        //
        this.getInfo = this.getInfo.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            //gex.initWithProvider(provider);
            let ip = '51.0.1.99';
            let port = '8546';
            gex.initBothProviders(ip, port, provider);
            this.setState({libInit: true});
        }
    }

    async getInfo(){
        //let account = '0x6870EA70c8582A3C3c778ae719b502e4644fD9dE';
        //
        //let accountInfo = await gex.bot().getInfoForAccount(account);
        let accountInfo = await gex.bot().getInfoForAccount();
        //
        this.setState({
            active: accountInfo.active,
            amountEth: accountInfo.amountEth,
            amountSkale: accountInfo.amountGex,
            loanEth: accountInfo.loanEth,
            loanGex: accountInfo.loanGex,
            sendEth: accountInfo.sendEth,
            sendSkale: accountInfo.sendGex,
        });

        console.log("infoinfoinfoinfoinfoinfoinfoinfoinfoinfo");
        console.log(accountInfo)

    }

    componentDidMount() {
        this.getInfo();
        this.setState({
            timer: setInterval(() => {
                this.getInfo()
            }, 15000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Account balance:</h4>
                <br/>
                <p>
                    <strong>Active:</strong> {this.state.active}
                </p>
                <p>
                    <strong>amountEth:</strong> {this.state.amountEth}
                </p>
                <p>
                    <strong>amountSkale:</strong> {this.state.amountSkale}
                </p>
                <p>
                    <strong>loanEth:</strong> {this.state.loanEth}
                </p>
                <p>
                    <strong>loanGex:</strong> {this.state.loanGex}
                </p>
                <p>
                    <strong>sendEth:</strong> {this.state.sendEth}
                </p>
                <p>
                    <strong>sendSkale:</strong> {this.state.sendSkale}
                </p>
            </div>

        )

    }

}
