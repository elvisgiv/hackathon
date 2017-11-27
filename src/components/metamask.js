import React from 'react'


export default class MetamaskConnector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3connection: false
        };
    }

    componentDidMount() {
        this.Exchange();
        this.interval = setInterval(() => this.Exchange(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    Exchange(){
        this.fetchNetwork()
        this.fetchAccounts()
        this.fetchBalances()
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

    fetchAccounts() {
        const { web3 } = window;
        const ethAccounts = this.getAccounts();
        this.setState({ethAccounts: ethAccounts})
    }

    fetchBalances() {
        const {web3} = window;
        var self = this;


        //web3.eth.getBalance(web3.eth.accounts[0],
        web3.eth.getBalance("0x8d12A197cB00D4747a1fe03395095ce2A5CC6819",
            function (error, balance) {
                //console.log(error)
                //console.log(balance.c.slice(-1).pop())
                console.log(balance.c[0])
                self.setState({balance: balance.c[0]})
            }
        )


        //let balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]));
        //this.setState({balance: balance})

    }


    render() {
        return (<div/>);
    }
}


function getNetwork(networkId) {
    switch (networkId) {
        case '1':
            return 'MAINNET';
        case '2':
            return 'MORDEN';
        case '42':
            return 'KOVAN';
        case '3':
            return 'ROPSTEN';
        default:
            return 'UNKNOWN';
    }
}