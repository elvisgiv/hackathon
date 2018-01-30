import React from 'react'

import { Button, Input, Row, Col, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //
        this.createAggregationMchain = this.createAggregationMchain.bind(this);
        this.createMchain = this.createMchain.bind(this);
        this.addToAggr = this.addToAggr.bind(this);
    }

    initMChainListener(){
        let listener = new gex.listener(gex.manager().events.MchainCreated(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
        });
        this.setState({mChainListener: listener})
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
        // invoke contract from lib
        gex.manager().createAggregationMchain(agrStorageBytes, agrLifetime, agrMaxNodes, agrDeposit, agrName);
        // clear fields
        this.setState({agrStorageBytes: "", agrLifetime: "", agrMaxNodes: "", agrDeposit: "", agrName: ""});
    }

    createMchain(){
        //
        let basName = this.state.basName;
        let basStorageBytes = this.state.basStorageBytes;
        let basLifetime = this.state.basLifetime;
        let basMaxNodes = this.state.basMaxNodes;
        let basDeposit = this.state.basDeposit;
        // test
        this.setState({bas: "bas"});

        this.initMChainListener();
        let test = gex.manager().createMchain(basStorageBytes, basLifetime, basMaxNodes, basDeposit, basName);
        // clear fields
        this.setState({basStorageBytes: "", basLifetime: "", basMaxNodes: "", basDeposit: "", basName: ""});

        console.log(test);
    }

    addToAggr(){
        let basName = this.state.basName;
        let agrName = this.state.agrName;

        this.setState({add: "add"});
        // gex.manager().addToAggregationChannel(basName, agrName);

    }

    render(){
        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Mchain Managing</h1>
                    <br/>
                    <Row>
                        <Col sd={4}>
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
                                <Button className="btn btn-lg" onClick={this.createAggregationMchain}>Create Aggregation Mchain</Button>
                            </div>
                            <h2>{this.state.agr}</h2>
                        </Col>

                        <Col sd={4}>

                            <h4 className="bold no-marg" >Create Mchain</h4>
                            <br/>

                            <Input id="basName" type="text" placeholder="Enter Name of mChain" onChange={(num) =>
                                this.setState({basName: num.target.value})} value={this.state.basName} />
                            {this.state.basName}
                            <h6 className="no-marg">Name of mChain</h6>
                            <br/>

                            <Input id="basStorageBytes" type="number" size="180" placeholder="Storage in Bytes" onChange={(num) =>
                                this.setState({basStorageBytes: num.target.value})} value={this.state.basStorageBytes}/>
                            {this.state.basStorageBytes}
                            <h6 className="no-marg">Number of bytes this channel can store</h6>
                            <br/>

                            <Input id="basLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                                this.setState({basLifetime: num.target.value})} value={this.state.basLifetime}/>
                            {this.state.basLifetime}
                            <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                            <br/>

                            <Input id="basMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                                this.setState({basMaxNodes: num.target.value})} value={this.state.basMaxNodes}/>
                            {this.state.basMaxNodes}
                            <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                            <br/>

                            <Input id="basDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                                this.setState({basDeposit: num.target.value})} value={this.state.basDeposit}/>
                            {this.state.basDeposit}
                            <h6 className="no-marg">Value of tokens associated with this channel</h6>
                            <br/>

                            <div className="col-md-12">
                                <Button className="btn btn-lg" onClick={this.createMchain}>Create Mchain</Button>
                            </div>
                            <h2>{this.state.bas}</h2>
                        </Col>


                        <Col sd={4}>
                            <h4 className="bold no-marg" >Adding to Aggregation</h4>
                            <br/>
                            <Input id="basName1" type="number" placeholder="mChain Name" onChange={(num) =>
                                this.setState({basName: num.target.value})} value={this.state.basName}/>
                            {this.state.basName}
                            <h6 className="no-marg">Enter mChain Name</h6>
                            <br/>

                            <Input id="agrName1" type="number" placeholder="Aggregation mChain Name" onChange={(num) =>
                                this.setState({agrName: num.target.value})} value={this.state.agrName}/>
                            {this.state.agrName}
                            <h6 className="no-marg">Enter Aggregation mChain Name</h6>
                            <br/>

                            <div className="col-md-12">
                                <Button className="btn btn-lg" onClick={this.addToAggr}>Add To Aggregation</Button>
                            </div>
                            <h2>{this.state.add}</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>


        )

    }

}
