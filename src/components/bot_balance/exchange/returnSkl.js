import React from 'react'

import { Button } from 'rmwc/Button';


const gex = require('@skale-labs/skale-api');

export default class ReturnSkl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libInit: false,
        };
        //
        this.returnSkl = this.returnSkl.bind(this);
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

    async returnSkl(){
        //
        this.initExEthListener();
        //
        await gex.bot().returnGex();
    }

    render(){
        return(
            <Button dense
                    onClick={this.returnSkl} disabled={this.state.libInit ? false : true}>
                get SKL
            </Button>

        )

    }

}
