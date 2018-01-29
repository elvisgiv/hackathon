import React from 'react'
const gex = require('@galacticexchange/gex-client-js');

export default class Test extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount(){
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        this.checkBalances();
    }

    async checkBalances() {
        let accounts = await gex.gexWeb3.getAccounts();
        let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        console.log('first account balance: ' + firstAccountBalance);

        let tokenAddr = gex.manager().contractAddress;
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
