import React from 'react'
const gex = require('@galacticexchange/gex-client-js');

export default class Test extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount(){

    }

    componentWillReceiveProps(){

        console.log(this.props.web3Connector)
        if (this.props.web3Connector){
            gex.initWithProvider(this.props.web3Connector.web3.currentProvider);
            this.checkBalances();
        }
    }

    async checkBalances() {
        let accounts = await gex.gexWeb3.getAccounts();
        let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        console.log('first account balance: ' + firstAccountBalance);

        let tokenAddr = gex.manager().contractAddress;
        console.log('contract addr:');
        console.log(gex.manager().contractAddress);

        let nodeManagerBalance = await gex.token().balanceOf(tokenAddr);
        console.log('node manager balance: ' + nodeManagerBalance);
    }



    render() {
        return (
            <div className="marg-30">
                <h1 className="bold no-marg" >Test</h1>
                <div className="padd-top-big">
                </div>
            </div>
        );
    }


}
