import React from 'react'

import { Button, ButtonIcon } from 'rmwc/Button';

const gex = require('@skale-labs/skale-api');

export default class ReturnEth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libInit: false,
        };
        //
        this.returnEth = this.returnEth.bind(this);
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

    async returnEth(){
        //
        this.initExEthListener();
        //
        await gex.bot().returnEth();
    }

    render(){
        return(
            <Button dense
                    onClick={this.returnEth} disabled={this.state.libInit ? false : true}>
                Withdraw Eth
                <ButtonIcon use="keyboard_arrow_right" className="marg-left-sm marg-ri-sm"/>
            </Button>

        )

    }

}
