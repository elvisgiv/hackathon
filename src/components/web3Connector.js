import React from 'react'
const gex = require('@skale-labs/skale-api');

export default class Web3Connector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            provider: undefined,
            loaded: false
        };
    }

    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.Web3Connector();
            self.interval = setInterval(() => self.Web3Connector(), 2000);
        }, 500);
    }

    componentDidUpdate() {
        if (!this.state.loaded){
            this.Web3Connector();
        }
    }

    Web3Connector() {
        if (this.checkConnection()){
            this.updateConnection();
            this.props.updateWeb3Connector(this.state);
        }
    }

    updateConnection() {
        this.setState({provider: window.web3.currentProvider, loaded: true});
    }

    checkConnection() {
        return (window.web3 && window.web3.currentProvider)
    }

    render() {
        return null // web3Connector doesn't have html representation
    }
}
