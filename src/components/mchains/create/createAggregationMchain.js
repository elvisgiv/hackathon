import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class CreateAggregationMchain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            agrName: '',
            agrStorageBytes: '',
            agrLifetime: '',
            agrMaxNodes: '',
            agrDeposit: '',
            mChainNonces: [],
            libInit: false,
        };
        //
        this.createAggregationMchain = this.createAggregationMchain.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            //gex.initWithProvider(provider);
            let ip = '51.0.1.99';
            let port = '8546';
            gex.initBothProviders(ip, port, provider);
            this.setState({libInit: true});
        }
    }

    initAggrMChainListener(){
        let listener = new gex.listener(gex.managerEv().events.AggregationMchainCreated(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
            //
            //event.returnValues.nonce
        });
        this.setState({aggrMchainListener: listener})
    }



    createAggregationMchain(){
        //
        let agrName = this.state.agrName;
        let agrStorageBytes = this.state.agrStorageBytes;
        let agrLifetime = this.state.agrLifetime;
        let agrMaxNodes = this.state.agrMaxNodes;
        let agrDeposit = this.state.agrDeposit;
        //
        this.initAggrMChainListener();
        // invoke contract from lib
        let nonce = gex.manager().createAggregationMchain(agrStorageBytes, agrLifetime, agrMaxNodes, agrDeposit, agrName);
        // clear fields
        this.setState({agrStorageBytes: "", agrLifetime: "", agrMaxNodes: "", agrDeposit: "", agrName: "",});

        //save nonces to array
        let arrayNonces = this.state.mChainNonces;
        arrayNonces.push(nonce);
        this.setState({mChainNonces: arrayNonces,});

    }


    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Create Aggregation Mchain</h4>
                <br/>
                <Input id="agrName" placeholder="Enter Name of mChain" onChange={(num) =>
                    this.setState({agrName: num.target.value})} value={this.state.agrName} />
                <h6 className="no-marg">Name of mChain</h6>
                <br/>

                <Input id="agrStorageBytes" type="number" placeholder="Storage in Bytes" onChange={(num) =>
                    this.setState({agrStorageBytes: num.target.value})} value={this.state.agrStorageBytes} />
                <h6 className="no-marg">Number of bytes this channel can store</h6>
                <br/>

                <Input id="agrLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                    this.setState({agrLifetime: num.target.value})} value={this.state.agrLifetime}/>
                <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                <br/>

                <Input id="agrMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                    this.setState({agrMaxNodes: num.target.value})} value={this.state.agrMaxNodes}/>
                <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                <br/>

                <Input id="agrDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                    this.setState({agrDeposit: num.target.value})} value={this.state.agrDeposit}/>
                <h6 className="no-marg">Value of tokens associated with this channel</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.createAggregationMchain} disabled={this.state.libInit ? false : true}>
                        Create Aggregation Mchain
                    </Button>
                </div>
            </div>

        )

    }

}
