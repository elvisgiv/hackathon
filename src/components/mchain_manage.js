import React from 'react'

const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
        //
        let wsAddr = 'ws://51.0.1.99:8546';
        gex.init(wsAddr);
        //
        //gex.managerContract().createBasicMchain();
        this.createAggregationMchain = this.createAggregationMchain.bind(this);
        this.createBasicMchain = this.createBasicMchain.bind(this);
        this.addBasicToAggr = this.addBasicToAggr.bind(this);

    }



    createAggregationMchain(){
        //
        let agrStorageBytes = this.state.agrStorageBytes;
        let agrLifetime = this.state.agrLifetime;
        let agrMaxNodes = this.state.agrMaxNodes;
        let agrDeposit = this.state.agrDeposit;
        // test
        this.setState({agr: "agr"});
        // invoke contract from lib
        gex.managerContract().createAggregationMchain(agrStorageBytes, agrLifetime, agrMaxNodes, agrDeposit);

        // clear fields
        this.setState({agrStorageBytes: "", agrLifetime: "", agrMaxNodes: "", agrDeposit: ""});

        // window.location.reload();


    }

    createBasicMchain(){
        //
        let basStorageBytes = this.state.basStorageBytes;
        let basLifetime = this.state.basLifetime;
        let basMaxNodes = this.state.basMaxNodes;
        let basDeposit = this.state.basDeposit;
        // test
        this.setState({bas: "bas"});
        let test = gex.managerContract().createBasicMchain(basStorageBytes, basLifetime, basMaxNodes, basDeposit);
        // clear fields
        this.setState({basStorageBytes: "", basLifetime: "", basMaxNodes: "", basDeposit: ""});

        console.log(test)
    }

    addBasicToAggr(){
        this.setState({add: "add"});
        // gex.managerContract().addToAggregationChannel();

    }

    // gex.managerContract().createBasicMchain();

    render(){
        return(
            <div className="fl-wrap fl-grow hidden">
                <h1 className="bold" >Mchain Managing</h1>
                <div className="fl-cont">


                    <div className="fl-wrap fl-grow fl-center-vert">
                        <div className="marg-30 fl-grow">
                            <h2 className="bold no-marg" >Create Aggregation Mchain</h2>
                            <br/>
                            <input className="input-size-mchain" id="agrStorageBytes" type="number" size="180" placeholder="Storage in Bytes" onChange={(num) =>
                                this.setState({agrStorageBytes: num.target.value})} />
                            {this.state.agrStorageBytes}
                            <h6 className="no-marg">Number of bytes this channel can store</h6>
                            <br/>

                            <input className="input-size-mchain" id="agrLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                                this.setState({agrLifetime: num.target.value})} value={this.state.agrLifetime}/>
                            {this.state.agrLifetime}
                            <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                            <br/>

                            <input className="input-size-mchain" id="agrMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                                this.setState({agrMaxNodes: num.target.value})} value={this.state.agrMaxNodes}/>
                            {this.state.agrMaxNodes}
                            <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                            <br/>

                            <input className="input-size-mchain" id="agrDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                                this.setState({agrDeposit: num.target.value})} value={this.state.agrDeposit}/>
                            {this.state.agrDeposit}
                            <h6 className="no-marg">Value of tokens associated with this channel</h6>
                            <br/>

                            <div className="col-md-12">
                                <button className="btn btn-lg" onClick={this.createAggregationMchain}>Create Aggregation Mchain</button>
                            </div>
                            <h2>{this.state.agr}</h2>
                        </div>

                        <div className="marg-30 fl-grow">
                            <h2 className="bold no-marg" >Create Basic Mchain</h2>
                            <br/>
                            <input className="input-size-mchain" id="basStorageBytes" type="number" size="180" placeholder="Storage in Bytes" onChange={(num) =>
                                this.setState({basStorageBytes: num.target.value})} value={this.state.basStorageBytes}/>
                            {this.state.basStorageBytes}
                            <h6 className="no-marg">Number of bytes this channel can store</h6>
                            <br/>

                            <input className="input-size-mchain" id="basLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                                this.setState({basLifetime: num.target.value})} value={this.state.basLifetime}/>
                            {this.state.basLifetime}
                            <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                            <br/>

                            <input className="input-size-mchain" id="basMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                                this.setState({basMaxNodes: num.target.value})} value={this.state.basMaxNodes}/>
                            {this.state.basMaxNodes}
                            <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                            <br/>

                            <input className="input-size-mchain" id="basDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                                this.setState({basDeposit: num.target.value})} value={this.state.basDeposit}/>
                            {this.state.basDeposit}
                            <h6 className="no-marg">Value of tokens associated with this channel</h6>
                            <br/>

                            <div className="col-md-12">
                                <button className="btn btn-lg" onClick={this.createBasicMchain}>Create Basic Mchain</button>
                            </div>
                            <h2>{this.state.bas}</h2>
                        </div>


                        <div className="marg-30 fl-grow">
                            <h2 className="bold no-marg" >Adding Basic to Aggregation</h2>
                            <br/>
                            <input className="input-size-mchain" id="storageBytes" type="number" size="180" placeholder="Storage in Bytes" onChange={(num) =>
                                this.setState({storageBytes: num.target.value})} value={this.state.storageBytes}/>
                            {this.state.storageBytes}
                            <h6 className="no-marg">Number of bytes this channel can store</h6>
                            <br/>

                            <input className="input-size-mchain" id="lifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                                this.setState({lifetime: num.target.value})} value={this.state.lifetime}/>
                            {this.state.lifetime}
                            <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                            <br/>

                            <input className="input-size-mchain" id="maxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                                this.setState({maxNodes: num.target.value})} value={this.state.maxNodes}/>
                            {this.state.maxNodes}
                            <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                            <br/>

                            <input className="input-size-mchain" id="deposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                                this.setState({deposit: num.target.value})} value={this.state.deposit}/>
                            {this.state.deposit}
                            <h6 className="no-marg">Value of tokens associated with this channel</h6>
                            <br/>

                            <div className="col-md-12">
                                <button className="btn btn-lg" onClick={this.addBasicToAggr}>Adding Mchains</button>
                            </div>
                            <h2>{this.state.add}</h2>
                        </div>


                    </div>
                </div>

            </div>


        )

    }

}
