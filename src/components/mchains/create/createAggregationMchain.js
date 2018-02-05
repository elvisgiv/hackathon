import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            agrName: '',
            agrStorageBytes: '',
            agrLifetime: '',
            agrMaxNodes: '',
            agrDeposit: '',
            mChainNonces: [],
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        //gex.init(ip, port);
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');

        //
        this.createAggregationMchain = this.createAggregationMchain.bind(this);
    }

    initAggrMChainListener(){
        let listener = new gex.listener(gex.manager().events.AggregationMchainCreated(), function (event) {
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
        // test
        this.setState({agr: "agr"});

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
                {this.state.agrName}
                <h6 className="no-marg">Name of mChain</h6>
                <br/>

                <Input id="agrStorageBytes" type="number" placeholder="Storage in Bytes" onChange={(num) =>
                    this.setState({agrStorageBytes: num.target.value})} value={this.state.agrStorageBytes} />
                {this.state.agrStorageBytes}
                <h6 className="no-marg">Number of bytes this channel can store</h6>
                <br/>

                <Input id="agrLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                    this.setState({agrLifetime: num.target.value})} value={this.state.agrLifetime}/>
                {this.state.agrLifetime}
                <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                <br/>

                <Input id="agrMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                    this.setState({agrMaxNodes: num.target.value})} value={this.state.agrMaxNodes}/>
                {this.state.agrMaxNodes}
                <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                <br/>

                <Input id="agrDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                    this.setState({agrDeposit: num.target.value})} value={this.state.agrDeposit}/>
                {this.state.agrDeposit}
                <h6 className="no-marg">Value of tokens associated with this channel</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.createAggregationMchain} disabled={gex.w3.web3 ? false : true}>
                        Create Aggregation Mchain
                    </Button>
                </div>
                <h2>{this.state.agr}</h2>
            </div>

        )

    }

}
