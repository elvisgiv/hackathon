import React from 'react'
import ReactDOM from "react-dom";
const isEmpty = require('lodash/isEmpty');

export default class WalletConnector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3connection: false
        };
    }

    componentDidMount() {
        this.WalletConnector();
        this.interval = setInterval(() => this.WalletConnector(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    WalletConnector(){
        this.fetchNetwork()
        this.fetchAccounts()
        this.fetchBalances()
        this.props.updateWalletConnector(this.state)
    }


    fetchNetwork() {
        const { web3 } = window;

        web3 && web3.version && web3.version.getNetwork((err, netId) => {
            if (err) {
                this.setState({
                    networkError: err
                });
            } else {
                this.setState({
                    networkError: null,
                    networkId: netId,
                    web3connection: true
                })

                this.setNetworkName()

            }
        });
    }

    getAccounts() {
        try {
            const {web3} = window;
            // throws if no account selected
            const accounts = web3.eth.accounts;

            return accounts;
        } catch (e) {
            return [];
        }
    }

    setNetworkName() {
        switch (this.state.networkId) {
            case '1':
                return this.setState({networkName: 'MAINNET'});
            case '2':
                return this.setState({networkName: 'MORDEN'});
            case '42':
                return this.setState({networkName: 'KOVAN'});
            case '3':
                return this.setState({networkName: 'ROPSTEN'});
            default:
                return this.setState({networkName: 'UNKNOWN'});
        }
    }

    fetchAccounts() {
        const { web3 } = window;
        const ethAccounts = this.getAccounts();
        this.setState({ethAccounts: ethAccounts})
    }

    fetchBalances() {
        const {web3} = window;
        var self = this;

        if(!web3){
            return
        }

        //web3.eth.getBalance(web3.eth.accounts[0],
        web3.eth.getBalance("0x8d12A197cB00D4747a1fe03395095ce2A5CC6819",
            function (error, balance) {
                self.setState({balance: balance.c[0]})
            }
        )

        //let balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]));
        //this.setState({balance: balance})

    }

    render() {
        return (
           <div></div>
        );
    }

}
