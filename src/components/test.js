import React from 'react'
import 'material-components-web/dist/material-components-web.min.css';
import {Button} from 'react-mdc-web/lib';

const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

const abi = [{
    "constant": false,
    "inputs": [
        {
            "name": "_to",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "transfer",
    "outputs": [
        {
            "name": "success",
            "type": "bool"
        }
    ],
    "payable": false,
    "type": "function"
}]
const address = '0xdeadbeef123456789000000000000'



export default class Test extends React.Component {

    componentDidMount(){
        const eth = new Eth(web3.currentProvider)
        const contract = new EthContract(eth)
        this.initContract(contract)


        this.callContract = this.callContract.bind(this)

        const filter = web3.eth.filter('latest');


        filter.watch((error, result) =>{
            const block = web3.eth.getBlock(result, true);
            this.setState({blockNumber: block.number});

            console.log('New block')
            console.log(block)
        });


    }

    initContract (contract) {
        const MiniToken = contract(abi)
        const miniToken = MiniToken.at(address)

        this.setState(
            {
                contract: miniToken
            }
        )


        console.log('testtttttt')
        console.log(miniToken)

        // example
        //miniToken.methods.myFunction().call().then(console.log);


        //listenForClicks(miniToken)
    }

    callContract(){
        console.log(this.state.contract.transfer.call());
    }


    render() {
        return (

            <div className="marg-30">
                <h1 className="bold no-marg" >Test</h1>

                <div className="padd-top-big">

                    <Button className="gx-btn gx-btn-def" onClick={this.callContract}>
                        Test call
                    </Button>

                </div>




            </div>
        );
    }
}
