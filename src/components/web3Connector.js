import React from 'react'
const gex = require('@galacticexchange/gex-client-js');

export default class Web3Connector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: undefined
        };
    }

    componentDidMount() {
        this.Web3Connector();
        this.interval = setInterval(() => this.Web3Connector(), 5000);
    }

    Web3Connector() {
        if (this.checkConnection()){
            this.updateConnection();
            this.props.updateWeb3Connector(this.state);
        }
    }


    async checkBalances() {
        let accounts = await gex.gexWeb3.getAccounts();

        console.log(accounts);

        let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        console.log('first account balance: ' + firstAccountBalance);

        let tokenAddr = gex.manager().contractAddress;

        console.log('contract addr:');
        console.log(gex.manager().contractAddress);


        let nodeManagerBalance = await gex.token().balanceOf(tokenAddr);
        console.log('node manager balance: ' + nodeManagerBalance);
    }

    updateConnection() {
        const {web3} = window;
        this.setState({web3: web3})

        //gex.initWithProvider(web3.currentProvider);
        //this.checkBalances();
    }

    checkConnection() {
        const {web3} = window;
        return (web3 && web3.eth)
    }


    render() {
        return null
    } // web3Connector doesn't have html representation
}
