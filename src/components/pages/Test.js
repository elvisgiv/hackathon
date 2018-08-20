import React from 'react'
import PageTitle from "../shared_components/PageTitle";

const skale = require('@skale-labs/skale-api');
const jsonCustom = require('../../abi.json');

export default class Test extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

/*

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector) {
            let provider = this.props.web3Connector.provider;
            let ip = '13.59.228.21';
            let port = '8546';
            console.log('inside componentWillReceiveProps');
            console.log(provider);

            skale.initBothProviders(ip, port, provider, jsonCustom);
            this.setState({libInit: true});

            this.createSchain();
        }
    }

    async createSchain(){
        let params = {
            storageBytes: 4578765,
            cpu: 34567,
            transactionThroughput: 345,
            lifetime: 10,
            typeOfNodes: 1,
            deposit: 350000000000000000000,
            name: skale.rand.randomString(7)
        };

        let res = await skale.contract('manager').createSchain(params);
        console.log(res.promise);
    }
*/


    render() {
        return (
            <div className="marg-30">
                <PageTitle
                    title="Test"
                    nopadd={true}
                />

                <div className="skale-card marg-bott-30">
                    leeeeeeeeee
                </div>
            </div>
        );
    }
}
