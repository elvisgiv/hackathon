import React from 'react'

export default class Web3Connector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: undefined
        };
    }

    componentDidMount() {
        this.Web3Connector();
        this.interval = setInterval(() => this.Web3Connector(), 2000);
    }

    Web3Connector() {
        if (this.checkConnection()){
            this.updateConnection();
            this.props.updateWeb3Connector(this.state);
        }
    }

    updateConnection() {
        const {web3} = window;
        this.setState({web3: web3})
    }

    checkConnection() {
        const {web3} = window;
        return (web3 && web3.eth)
    }


    render() {
        return null
    } // web3Connector doesn't have html representation
}
