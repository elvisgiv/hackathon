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
            libInit: false,

        };
        //
        this.addToAggr = this.addToAggr.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            gex.initWithProvider(provider);
            this.setState({libInit: true});
        }
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
                <h6 className="no-marg">Enter mChain ID</h6>
                <br/>

                <Input id="aggrMchainID" type="number" placeholder="Aggregation mChain ID" onChange={(num) =>
                    this.setState({aggrMchainID: num.target.value})} value={this.state.aggrMchainID}/>
                <h6 className="no-marg">Enter Aggregation mChain ID</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.addToAggr} disabled={this.state.libInit ? false : true}>
                        Add To Aggregation
                    </Button>
                </div>
            </div>

        )

    }

}
