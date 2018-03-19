import React from 'react'

import { Button, Input,  } from 'reactstrap';

import swal from 'sweetalert';



const gex = require('@skale-labs/skale-api');
//const gex = require('@skale-labs/skale-api/src/index');

export default class CreateMchain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basName: '',
            basStorageBytes: '',
            basLifetime: '',
            basMaxNodes: '',
            basDeposit: '',
            basCpuTime: '',
            basTransPerSec: '',
            libInit: false,
            mChainNonces: [],
        };
        //
        this.createMchain = this.createMchain.bind(this);

    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            //gex.initWithProvider(provider);
            let ip = '51.0.1.99';
            let port = '8546';
            gex.initBothProviders(ip, port, provider);
            this.setState({libInit: true});
            ///
            this.initMChainListener();
        }
    }

    initMChainListener(){
        let self = this;
        let listener = new gex.listener(gex.managerEv().events.MchainCreated(), function (event) {
            console.log('EVENT');
            console.log(event.returnValues);
            self.setState({nonceFromEvent: event.returnValues.nonce})
        });
        this.setState({mChainListener: listener})
    }

    isFilled(basName, basStorageBytes, basLifetime, basMaxNodes,
             basDeposit, basCpuTime, basTransPerSec) {
        if (basName.length > 0 && basStorageBytes.length > 0 && basLifetime.length > 0 && basMaxNodes.length > 0 &&
            basDeposit.length > 0 && basCpuTime.length > 0 && basTransPerSec.length > 0) {
            console.log(basName);
            return true
        } else {
            return false
        }
    }

    async createMchain(){
        // from form
        let basName = this.state.basName;
        let basStorageBytes = this.state.basStorageBytes;
        let basLifetime = this.state.basLifetime;
        let basMaxNodes = this.state.basMaxNodes;
        let basDeposit = this.state.basDeposit;
        let basCpuTime = this.state.basCpuTime;
        let basTransPerSec = this.state.basTransPerSec;
        // to hash
        let mChain = {storageBytes: basStorageBytes, cpu: basCpuTime, transactionThroughput: basTransPerSec, lifetime: basLifetime,
            maxNodes: basMaxNodes, deposit: basDeposit, name: basName};
        //
        let isAvailable = false;
        //
        let isFilled = this.isFilled(basName, basStorageBytes, basLifetime, basMaxNodes,
            basDeposit, basCpuTime, basTransPerSec );
        //
        if (isFilled) {
            isAvailable = await gex.manager().isMchainIdAvailable(basName);
        } else {
            return (
                swal({
                    title: "Attention!!!",
                    text: "Please fill all fields",
                    icon: "warning",
                    //buttons: true,
                    dangerMode: true,
                })
        )
        }
        //
        if (isAvailable) {
            let nonce = await gex.manager().createMchain( mChain );
            // clear fields
            this.setState({basStorageBytes: "", basLifetime: "", basMaxNodes: "", basDeposit: "", basName: "",
                basCpuTime: "", basTransPerSec: "",});

            swal({
                title: "Congratulations!",
                text: "You just created the mchain!",
                icon: "success",
            })

        } else {
            return (
                swal({
                    title: "Attention!!!",
                    text: "Mchain with name '" + basName + "' already exists!",
                    icon: "warning",
                    //buttons: true,
                    dangerMode: true,
                })
            )
        }


        //save nonces to array
/*        let arrayNonces = this.state.mChainNonces;
        arrayNonces.push(nonce);
        this.setState({mChainNonces: arrayNonces,});*/
    }


    render(){
        return(
            <div>
                <h4 className="bold no-marg" >Create Schain</h4>
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

                <Input id="basCpuTime" type="number" size="150" placeholder="CPU Time" onChange={(num) =>
                    this.setState({basCpuTime: num.target.value})} value={this.state.basCpuTime}/>
                <h6 className="no-marg">CPU Time in %</h6>
                <br/>

                <Input id="basTransPerSec" type="number" size="150" placeholder="Transaction Per Second" onChange={(num) =>
                    this.setState({basTransPerSec: num.target.value})} value={this.state.basTransPerSec}/>
                <h6 className="no-marg">Number Of Transaction Per Second</h6>
                <br/>

                <div className="col-md-12">
                    <Button className="btn btn-lg"
                            onClick={this.createMchain} disabled={this.state.libInit ? false : true}>
                        Create Schain
                    </Button>
                </div>

            </div>

        )

    }

}
