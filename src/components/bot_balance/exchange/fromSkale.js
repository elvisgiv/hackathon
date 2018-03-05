import React from 'react'

import { Button, Input, } from 'reactstrap';
import FromEth from './fromEth';
import swal from 'sweetalert';


const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class FromSkale extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ethVal: '',
            skaleVal: '',
            libInit: false,
        };
        //
        this.exchangeSkale = this.exchangeSkale.bind(this);
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

    exchangeSkale(){
        //
        let skaleVal = this.state.skaleVal;
        //
        let isFilled = FromEth.isFilled(skaleVal);
        //
        if (isFilled) {
            //
            this.initExEthListener();
            // get 'wei' from skale
            let weiVal = gex.w3.web3.utils.toWei(skaleVal);
            // invoke contract from lib
            let promise = gex.bot().depositGex(weiVal);
            //
            console.log('exchangeSkaleexchangeSkaleexchangeSkaleexchangeSkaleexchangeSkale');
            // clear fields
            this.setState({skaleVal: ""});
        } else {
            return (
                swal({
                    title: "Attention!!!",
                    text: "Please fill the 'Amount of SkaleTokens' field",
                    icon: "warning",
                    //buttons: true,
                    dangerMode: true,
                })
            )
        }
    }

    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Change SkaleTokens to Eth</h4>
                <br/>
                <Input id="skaleVal" type="number" placeholder="Amount of SkaleTokens" onChange={(num) =>
                    this.setState({skaleVal: num.target.value})} value={this.state.skaleVal} />
                <h6 className="no-marg">The amount of SkaleTokens that you want to exchange</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.exchangeSkale} disabled={this.state.libInit ? false : true}>
                        Exchange
                    </Button>
                </div>
            </div>

        )

    }

}
