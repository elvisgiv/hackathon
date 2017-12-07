import React from 'react'
import 'material-components-web/dist/material-components-web.min.css';
import {Button} from 'react-mdc-web/lib';

const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')
const HttpProvider = require('ethjs-provider-http');

const Web3 = require('web3');
//Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

const jsonData = require('./data.json');

const abi = jsonData['registration_abi']
const contractAddress = jsonData['registration_address']

//const address = '0xdeadbeef123456789000000000000'


export default class Test extends React.Component {

    componentDidMount(){
        //const eth = new Eth(web3.currentProvider)
        //const httpProvider  = new HttpProvider('http://10.1.0.11:8545')
        //const eth = new Eth(new HttpProvider('http://10.1.0.11:8545'))

        //let web3 = new Web3(Web3.givenProvider || "ws://10.1.0.11:8546");
        let web3 = new Web3("ws://10.1.0.11:8546");
        //let web3 = new Web3(new HttpProvider('http://10.1.0.11:8545'));
        web3.setProvider(new web3.providers.HttpProvider('http://10.1.0.11:8545'));

        this.setState({web3: web3})

        const contract = new EthContract(web3.eth)

        this.initContract(contract)

        this.callContract = this.callContract.bind(this)
    }

    initContract (contract) {
        const MiniToken = contract(abi)
        const miniToken = MiniToken.at(contractAddress)

        //const filter = miniToken.NewNumber();

        // todo => filter
        /*const filter = miniToken.NewNumber().new((error, result) => {
           console.log('init')
           console.log(result)
           console.log(error)
        });*/

        const filter = { }

        //filter.watch().then((result) => {
        //    console.log('watch')
        //    console.log(result)
        //});

        this.setState({ contract: miniToken, filter: filter })

    }

    callContract(){

        let account = this.state.web3.eth.accounts[0]
        let self = this

        this.state.web3.personal.unlockAccount(account, '123', 0, function(error, result){
            if(!error){
                console.log(result);
                console.log(account);

                let getData = self.state.contract.setNumber(9, {to:contractAddress, from: account});

                console.log(getData);

                let resp = self.state.contract.getNumber()

                console.log(resp);
                //self.state.contract.transact({'from': account}).setNumber(9)
            }
            else{
                console.error(error);
            }

        })

        //this.state.contract.transact({'from': web3.eth.accounts[0]}).setNumber(9)
        //console.log(this.state.contract.transfer.call());
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
