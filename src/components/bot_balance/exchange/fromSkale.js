import React from 'react'

import {Tooltip, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {TextField, TextFieldHelperText} from 'rmwc/TextField';
import {Icon} from 'rmwc/Icon';
import {Button} from 'rmwc/Button';

import PageTitle from "../../shared/pageTitle";


import FromEth from './fromEth';
import swal from 'sweetalert';


const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class FromSkale extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skaleVal: '',
            libInit: false,

            tooltipSkaleVal: false,

        };
        //
        this.exchangeSkale = this.exchangeSkale.bind(this);
        this.toggle = this.toggle.bind(this);

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

    async exchangeSkale(){
        //
        let skaleVal = this.state.skaleVal;
        //
        let isFilled = FromEth.isFilled(skaleVal);
        //
        if (isFilled) {
            //
            this.initExEthListener();
            // get 'wei' from skale
            let weiVal = await gex.w3.web3.utils.toWei(skaleVal);
            // invoke contract from lib
            //let promise = await gex.bot().depositGex({value: weiVal});
            let promise = gex.bot().depositGex({value: weiVal});
            //
            console.log('exchangeSkaleexchangeSkaleexchangeSkaleexchangeSkaleexchangeSkale');
            // clear fields
            this.setState({skaleVal: ""});
            //
            swal({
                title: "Congratulations!!!",
                text: "You just exchanged 80% of your amount, the remaining 20% you can pick up after the close of exchange!",
                icon: "success",
                //buttons: true,
            });

            this.props.fatherToggleColl()

        } else {
            return (
                swal({
                    title: "Attention!!!",
                    text: "Please fill the 'Amount of SKL' field",
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
            <div className="">

                <ModalHeader>
                    <PageTitle
                        title="Sell SKALE"
                        subtitle='After filling field "Amount of SKALE" push "sell" button, a MetaMask pop-up window will appear.
                            To provide a transaction, you must click "submit" on it.'
                    />
                </ModalHeader>

                <ModalBody>
                    <Input className="new-input" id="sellSkl" type="number" size="150" placeholder="
                            The amount of SkaleTokens that you want to sell."
                           onChange={(num) =>
                               this.setState({skaleVal: num.target.value})} value={this.state.skaleVal}/>
                </ModalBody>

                <ModalFooter>
                    <Button raised
                            onClick={() => {this.exchangeSkale(); }}
                            disabled={this.state.libInit ? false : true}>
                        Sell
                    </Button>
                    <Button color="secondary" onClick={this.props.fatherToggleColl}>
                        Cancel
                    </Button>
                </ModalFooter>

            </div>



        )

    }

}
