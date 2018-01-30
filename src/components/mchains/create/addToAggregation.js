import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mChainID: '',
            aggrMchainID: '',
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //
        this.addToAggr = this.addToAggr.bind(this);
    }


    initMchainAddedListener(){
        let listener = new gex.listener(gex.manager().events.MchainAdded(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
        });
        this.setState({mChainAddedListener: listener})
    }


    addToAggr(){
        let mChainID = this.state.mChainID;
        let aggrMchainID = this.state.aggrMchainID;

        this.initMchainAddedListener();

        this.setState({add: "add"});
        let test = gex.manager().addToAggregationMchain(mChainID, aggrMchainID);
        // clear fields
        this.setState({mChainID: "", aggrMchainID: "", });

        console.log(test);

    }

    render(){

        return(

            <div>
                <h4 className="bold no-marg" >Adding to Aggregation</h4>
                <br/>
                <Input id="mChainID" type="number" placeholder="mChain ID" onChange={(num) =>
                    this.setState({mChainID: num.target.value})} value={this.state.mChainID}/>
                {this.state.mChainID}
                <h6 className="no-marg">Enter mChain ID</h6>
                <br/>

                <Input id="aggrMchainID" type="number" placeholder="Aggregation mChain ID" onChange={(num) =>
                    this.setState({aggrMchainID: num.target.value})} value={this.state.aggrMchainID}/>
                {this.state.aggrMchainID}
                <h6 className="no-marg">Enter Aggregation mChain ID</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg" onClick={this.addToAggr}>Add To Aggregation</Button>
                </div>
                <h2>{this.state.add}</h2>
            </div>

        )

    }

}
