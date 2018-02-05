import React from 'react'

import { Button, Input, } from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basName: '',
            basStorageBytes: '',
            basLifetime: '',
            basMaxNodes: '',
            basDeposit: '',
            libInit: false,
            mChainNonces: [],

        };
        //
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.1.99', '8546');
        //
        this.createMchain = this.createMchain.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            gex.initWithProvider(provider);
            //gex.init('51.0.1.99', '8546');
            this.setState({libInit: true});
        }
    }

    initMChainListener(){
        let self = this;
        console.log('before listenerbefore listenerbefore listenerbefore listenerbefore listener');
        let listener = new gex.listener(gex.manager().events.MchainCreated(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
            console.log('noncenoncenoncenoncenoncenonce');
            console.log(event.returnValues.nonce);
            self.setState({nonceFromEvent: event.returnValues.nonce})
        });
        this.setState({mChainListener: listener})
    }

    async createMchain(){
        //
        let basName = this.state.basName;
        let basStorageBytes = this.state.basStorageBytes;
        let basLifetime = this.state.basLifetime;
        let basMaxNodes = this.state.basMaxNodes;
        let basDeposit = this.state.basDeposit;

        this.initMChainListener();
        let nonce = await gex.manager().createMchain(basStorageBytes, basLifetime, basMaxNodes, basDeposit, basName);
        // clear fields
        this.setState({basStorageBytes: "", basLifetime: "", basMaxNodes: "", basDeposit: "", basName: ""});

        //save nonces to array
        let arrayNonces = this.state.mChainNonces;
        arrayNonces.push(nonce);
        this.setState({mChainNonces: arrayNonces,});

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
        console.log(nonce);


        console.log('listener listener listener listener listener ');
        console.log(this.state.nonceFromEvent);
        console.log('nononononononononononononon');
        console.log(this.state.mChainListener);

    }


    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Create Mchain</h4>
                <br/>

                <Input id="basName" type="text" placeholder="Enter Name of mChain" onChange={(num) =>
                    this.setState({basName: num.target.value})} value={this.state.basName} />
                <h6 className="no-marg">Name of mChain</h6>
                <br/>

                <Input id="basStorageBytes" type="number" size="180" placeholder="Storage in Bytes" onChange={(num) =>
                    this.setState({basStorageBytes: num.target.value})} value={this.state.basStorageBytes}/>
                <h6 className="no-marg">Number of bytes this channel can store</h6>
                <br/>

                <Input id="basLifetime" type="number" size="150" placeholder="Lifetime in seconds" onChange={(num) =>
                    this.setState({basLifetime: num.target.value})} value={this.state.basLifetime}/>
                <h6 className="no-marg">Number of seconds this channel will be considered as alive</h6>
                <br/>

                <Input id="basMaxNodes" type="number" size="150" placeholder="Max number of nodes" onChange={(num) =>
                    this.setState({basMaxNodes: num.target.value})} value={this.state.basMaxNodes}/>
                <h6 className="no-marg">Max number of nodes associated with this channel</h6>
                <br/>

                <Input id="basDeposit" type="number" size="150" placeholder="Deposit" onChange={(num) =>
                    this.setState({basDeposit: num.target.value})} value={this.state.basDeposit}/>
                <h6 className="no-marg">Value of tokens associated with this channel</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg" onClick={this.createMchain} disabled={this.state.libInit ? false : true}>Create Mchain</Button>
                </div>

            </div>

        )

    }

}
