import React from 'react'
const Web3 = require('web3');

export default class Web3Connector extends React.Component {

    constructor(props) {
        super(props);

        //let httpProvider = 'http://10.1.0.11:8545';

        // todo:
        // 1) init gexClientJs lib
        // 2) save it in state


        this.state = {
            web3provider: undefined,
            web3connection: false
        };
    }

    componentDidMount() {
        this.Web3Connector();
        this.interval = setInterval(() => this.Web3Connector(), 3000);
    }

    Web3Connector(){
        this.checkWeb3()
    }

    checkWeb3(){

    }


    render(){ return null } // web3Connector doesn't have html representation
}