import React from 'react'

import { Tooltip, Input} from 'reactstrap';
import {TextField, TextFieldHelperText} from 'rmwc/TextField';
import {Icon} from 'rmwc/Icon';
import {Button} from 'rmwc/Button';
//
import swal from 'sweetalert';


const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class FromEth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ethVal: '',
            libInit: false,

            tooltipEthVal: false,

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

    static isFilled(value) {
        if (value.length > 0 ) {
            console.log(value);
            return true
        } else {
            return false
        }
    }

    async exchangeEth(){
        //
        let ethVal = this.state.ethVal;
        //
        let isFilled = FromEth.isFilled(ethVal);
        //
        if (isFilled) {
            //
            this.initExEthListener();
            // get 'wei' from eth
            let weiVal = await gex.w3.web3.utils.toWei(ethVal);
            // invoke contract from lib
            let promise = await gex.bot().depositEth({value: weiVal});
            //
            console.log('exchangeEthexchangeEthexchangeEthexchangeEthexchangeEth');
            // clear fields
            this.setState({ethVal: ""});
            //
            swal({
                title: "Congratulations!!!",
                text: "You just exchanged 80% of your amount, the remaining 20% you can pick up after the close of exchange!",
                icon: "success",
                //buttons: true,
            })
        } else {
            return (
                swal({
                    title: "Attention!!!",
                    text: "Please fill the 'Amount of ETH' field",
                    icon: "warning",
                    //buttons: true,
                    dangerMode: true,
                })
            )
        }

    }

    toggle(fieldName) {
        if(this.state[fieldName] !== undefined){
            let newState = {};
            newState[fieldName] = !this.state[fieldName];
            this.setState(newState);
        }
    }


    render(){
        return(
            <div className="marg-30">
                <div className="padd-left-md">
                    <br/>

                    <h5 className="bold no-marg" >Change ETH to SkaleTokens (SKL)</h5>

                    <br/>

                    <div className="fl-cont fl-center-vert">
                        <div className="fl-wrap">
                            <TextField className="skale-field" id="ethVal" type="number" size="150" label="Amount of ETH" onChange={(num) =>
                                this.setState({ethVal: num.target.value})} value={this.state.ethVal} onFocus={() => this.toggle('tooltipEthVal')} onBlur={() => this.toggle('tooltipEthVal')}/>
                        </div>
                        <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                            <Icon strategy="ligature" id="TooltipEthVal" className="lite-gr-col">info_outline</Icon>
                            <Tooltip placement="right" isOpen={this.state.tooltipEthVal} target="TooltipEthVal" toggle={() => this.toggle('tooltipEthVal')}>
                                The amount of ETH that you want to exchange
                            </Tooltip>
                        </div>
                    </div>

                    <br/>

                    <Button raised
                            onClick={this.exchangeEth} disabled={this.state.libInit ? false : true}>
                        Exchange
                    </Button>
                </div>
            </div>

        )

    }

}
