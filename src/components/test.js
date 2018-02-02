import React from 'react'
const gex = require('@galacticexchange/gex-client-js/src/index');

import {Button} from 'react-mdc-web/lib';


export default class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            libInit: false
        }

    }


    componentDidMount(){

    }

    componentWillReceiveProps(){
        if (!gex.w3.web3){
            let provider = this.props.web3Connector.provider;
            gex.initWithProvider(provider);
            //gex.init('51.0.1.99', '8546');
            this.setState({libInit: true});

            this.checkBalances();

        }
    }

    async checkBalances() {
        let accounts = await gex.gexWeb3.getAccounts();
        console.log(accounts);





        /*let firstAccountBalance = await gex.token().balanceOf(accounts[0]);
        console.log('first account balance: ' + firstAccountBalance);

        let tokenAddr = gex.manager().contractAddress;
        console.log('contract addr:');
        //console.log(gex.manager().contractAddress);
        console.log('acc');
        /!*console.log(gex.w3.web3.currentProvider.publicConfigStore._state.selectedAddress);
        console.log(accounts[0]);*!/

        let nodeManagerBalance = await gex.token().balanceOf(tokenAddr);
        console.log('node manager balance: ' + nodeManagerBalance);*/
    }

    createMchain(){
        console.log('create')
        gex.manager().createMchain(98764, 6000, 12345, 4444, 'testBrowser');
    }



    render() {
        return (
            <div className="marg-30">
                <h1 className="bold no-marg" >Test</h1>
                <div className="padd-top-big">
                    <div className={this.state.libInit ? '' : 'hidden'}>
                        <Button className="gx-btn gx-btn-def" onClick={() => { this.createMchain(); }}>
                            Create mChain
                        </Button>
                    </div>
                </div>
            </div>
        );
    }


}
