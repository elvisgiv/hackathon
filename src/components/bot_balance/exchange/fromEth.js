import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class FromEth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ethVal: '',
            skaleVal: '',
            libInit: false,
        };
        //
        this.exchangeEth = this.exchangeEth.bind(this);
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

    initExEthListener(){
        let listener = new gex.listener(gex.botEv().events.Message(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
            //
            //event.returnValues.nonce
        });
        this.setState({initExEthListener: listener})
    }



    exchangeEth(){
        //
        let ethVal = this.state.ethVal;
        //
        this.initExEthListener();
        // get 'wei' from eth
        let weiVal = gex.w3.web3.utils.toWei(ethVal);
        // invoke contract from lib
        let promise = gex.bot().depositEth(weiVal);
        //
        console.log('exchangeEthexchangeEthexchangeEthexchangeEthexchangeEth');
        // clear fields
        this.setState({ethVal: ""});

    }


    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Change Eth to SkaleTokens</h4>
                <br/>
                <Input id="ethVal" placeholder="Amount of Eth" onChange={(num) =>
                    this.setState({ethVal: num.target.value})} value={this.state.ethVal} />
                <h6 className="no-marg">The amount of Eth that you want to exchange</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.exchangeEth} disabled={this.state.libInit ? false : true}>
                        Exchange
                    </Button>
                </div>
            </div>

        )

    }

}
