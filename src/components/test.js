import React from 'react'
import {Button} from 'react-mdc-web/lib';

const Web3 = require('web3');
const EthContract = require('ethjs-contract');

// contract ABI and addr
const jsonData = require('../../test/data.json');
const abi = jsonData['registration_abi'];
const contractAddress = jsonData['registration_address'];

const web3Provider = new Web3.providers.HttpProvider("http://10.1.0.11:8545");

export default class Test extends React.Component {

    constructor(props) {
        super(props);

        let web3 = new Web3(web3Provider);
        const contractCreator = new EthContract(web3.eth);

        this.state = {
            web3: web3,
            contractCreator: contractCreator,
            number: 9,
        };

        this.setNumber = this.setNumber.bind(this);
        this.getNumber = this.getNumber.bind(this)
    }


    componentDidMount(){
        this.initContract(this.state.contractCreator)
    }


    initContract (contractCreator) {
        let self = this;

        let TestContract = contractCreator(abi);
        let testContract = TestContract.at(contractAddress);

        let filter = this.state.web3.eth.filter(testContract.NewNumber);
        filter.watch((err, result) => {
            console.log('Event: NewNumber')
            self.getNumber()
        });

        this.setState({ contract: testContract, filter: filter})
    }


    setNumber(){
        let account = this.state.web3.eth.accounts[0];
        let self = this;

        this.state.web3.personal.unlockAccount(account, '123', 0, function(error, result){
            if(!error){
                console.log("Unlocked: " + result + " , addr: " + account);
                self.state.contract.setNumber(self.state.number, {to: contractAddress, from: account});
            }
            else{
                console.error(error);
            }

        })
    }


    getNumber(){
        let self = this;
        this.state.contract.getNumber().then(function(value){
            let blockchainNumber = value.out.words[0];
            self.setState({blockchainNumber: blockchainNumber})
        });
    }


    render() {
        return (
            <div className="marg-30">
                <h1 className="bold no-marg" >Test</h1>
                <div className="padd-top-big">

                    <input style={{width: '150px'}} type="number" value={this.state.number} onChange={(num) =>
                      this.setState({number: num.target.value})}/>
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
