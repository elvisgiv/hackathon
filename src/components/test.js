import React from 'react'
//import 'material-components-web/dist/material-components-web.min.css';
import {Button, Textfield} from 'react-mdc-web/lib';

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


    constructor(props) {
        super(props)

        let web3 = new Web3("ws://10.1.0.11:8546");
        web3.setProvider(new web3.providers.HttpProvider('http://10.1.0.11:8545'));
        const contract = new EthContract(web3.eth)

        this.state = {
            web3: web3,
            contract: contract,
            number: 9,
        }

        this.setNumber = this.setNumber.bind(this)
        this.getNumber = this.getNumber.bind(this)
    }

    componentDidMount(){
        this.initContract(this.state.contract)
    }

    initContract (contract) {
        // init contract
        const MiniToken = contract(abi)
        const miniToken = MiniToken.at(contractAddress)

        // init event watch
        let filter = this.state.web3.eth.filter('resolved');

        filter.watch(function (error, log) {
            console.log('resss');
            console.log(log);
        });

        // save in state
        this.setState({ contract: miniToken, filter: filter })
    }


    setNumber(){
        let account = this.state.web3.eth.accounts[0];
        let self = this;

        this.state.web3.personal.unlockAccount(account, '123', 0, function(error, result){
            if(!error){
                console.log("Unlocked: "+result+ " , addr: "+account);

                let getData = self.state.contract.setNumber(self.state.number, {to:contractAddress, from: account});
                //console.log(getData);

                //let resp = self.state.contract.getNumber()
                //console.log(resp);
            }
            else{
                console.error(error);
            }

        })
    }

    getNumber(){

        let self = this;

        this.state.contract.getNumber().then(function(value){
            console.log(value.out.words[0]);
            self.setState({blockchainNumber: value.out.words[0]})
        });
    }

    render() {
        return (

            <div className="marg-30">
                <h1 className="bold no-marg" >Test</h1>
                <div className="padd-top-big">

                    <input style={{width: '150px'}} type="number" value={this.state.number} onChange={(num) => this.setState({number: num.target.value})}/>

                    <br/>
                    <br/>
                    <Button className="gx-btn gx-btn-def" onClick={this.setNumber}>
                        Set number {this.state.number}
                    </Button>
                    <br/>
                    <br/>
                    <Button className="gx-btn gx-btn-def" onClick={this.getNumber}>
                        Get number
                    </Button>

                    <h2>{this.state.blockchainNumber}</h2>


                </div>
            </div>
        );
    }
}
