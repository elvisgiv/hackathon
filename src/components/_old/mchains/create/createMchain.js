import React from 'react'
import {Redirect} from 'react-router'

import {Input, Container, Tooltip} from 'reactstrap';

import {TextField, TextFieldHelperText} from 'rmwc/TextField';
import {Icon} from 'rmwc/Icon';
import {Button} from 'rmwc/Button';

import CardInfo from "../../shared_components/cardInfo";
import PageTitle from "../../shared_components/pageTitle";
import CardTitle from "../../shared_components/cardTitle";
import SectionText from "../../shared_components/SectionText";


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
      basDeposit: 2300,
      basCpuTime: '',
      basTransPerSec: '',
      libInit: false,
      mChainNonces: [],

      tooltipStorageBytes: false,
      tooltipLifetime: false,
      tooltipMaxNodes: false,
      tooltipDeposit: false,
      tooltipCpuTime: false,
      tooltipTransPerSec: false,
    };
    //
    this.createMchain = this.createMchain.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
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

  initMChainListener() {
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

  async createMchain() {
    // from form
    let basName = this.state.basName;
    let basStorageBytes = this.state.basStorageBytes;
    let basLifetime = this.state.basLifetime;
    let basMaxNodes = this.state.basMaxNodes;
    let basDeposit = this.state.basDeposit;
    let basCpuTime = this.state.basCpuTime;
    let basTransPerSec = this.state.basTransPerSec;
    // to hash
    let mChain = {
      storageBytes: basStorageBytes, cpu: basCpuTime, transactionThroughput: basTransPerSec, lifetime: basLifetime,
      maxNodes: basMaxNodes, deposit: basDeposit, name: basName
    };
    //
    let isAvailable = false;
    //
    let isFilled = this.isFilled(basName, basStorageBytes, basLifetime, basMaxNodes,
      basDeposit, basCpuTime, basTransPerSec);
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
      let nonce = await gex.manager().createMchain(mChain);
      // clear fields
      this.setState({
        basStorageBytes: "", basLifetime: "", basMaxNodes: "", basDeposit: "", basName: "",
        basCpuTime: "", basTransPerSec: "", snackbarIsOpen: true, sChainsPage: true
      });


      // todo
      //this.props.history.push("/schains");


      /*swal({
        title: "Congratulations!",
        text: "You just created the mchain!",
        icon: "success",
      })*/

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


  toggle(fieldName) {
    if (this.state[fieldName] !== undefined) {
      let newState = {};
      newState[fieldName] = !this.state[fieldName];
      this.setState(newState);
    }
  }


  calcDeposit() {
    this.setState({basStorageBytes: num.target.value})
  }

  render() {
    const {sChainsPage} = this.state;

    if (sChainsPage) {
      return <Redirect to="/schains" push={true}/>
    }

    return (
      <div className="marg-30">

        <PageTitle
          title="Create sChain"
          subtitle="Create your own sChain with custom parameters."
        />

        {/*<div className='fl-wrap padd-md clickable lite-gx-border choice-card'>
          <div className='fl-cont fl-center-vert bord-bott padd-bott-md'>
            <div className='fl-wrap padd-ri-md'>
              <div className='grad-aws grad-wrap'>
                <Icon strategy="ligature" className="lg-icon white-text">info</Icon>
              </div>
            </div>
            <div className='fl-wrap fl-grow padd-left-md padd-ri-md'>
              <h3 className='bold choice-title'>Small</h3>
              <div className='fl-cont marg-top-10'>
                <div className='fl-wrap padd-top-10'>
                  <CardInfo
                    k="some short descpiption for this type"
                    value=''
                    nopadd={true}
                  />
                </div>
              </div>
            </div>
            <div className='fl-wrap padd-left-md padd-ri-10 marg-left-md'>
              <Icon strategy="ligature" className=" info-icon">keyboard_arrow_right</Icon>
            </div>
          </div>

          <div className='padd-top-md padd-left-md'>
            <CardInfo
              k="Storage in bytes:"
              value='1500'
              //tooltipText="Number of bytes this channel can store"
            />
            <CardInfo
              k="Lifetime:"
              value='10000'
              //tooltipText="Number of seconds this channel will be considered as alive"
            />
            <CardInfo
              k="Max number of nodes:"
              value='26'
              //tooltipText="Max number of nodes associated with this channel"
            />
            <CardInfo
              k="CPU Time:"
              value='50'
              //tooltipText="CPU Time in %"
            />
            <CardInfo
              k="Transactions Per Second:"
              value='2500'
              //tooltipText="Number Of Transactions Per Second"
              nopadd={true}
            />
          </div>


        </div>*/}

        <div className="skale-card padd-30 marg-bott-30">

          <CardTitle icon="settings" text="Configuration"/>


          <div className="card-content">


            <div className="padd-top-10 padd-bott-10">
              <SectionText
                text="Fill these fields to create an sChain."
                //tooltipText="todo: short explanation for the sChain creation"
                nopadd={true}
              />

              <SectionText
                text="Then click 'Create sChain' and MetaMask pop-up will appear.
                    Click 'Submit' to confirm a transaction."
                //tooltipText="todo: short explanation for the sChain creation"
              />
            </div>


            <div className="form-wrap" style={{maxWidth: "850px"}}>
              <div className="">
                <div className="">
                  <h6 className="like-old">Name of sChain</h6>
                  <div className="fl-col fl-grow">
                    <Input className="new-input" id="basName" type="text" placeholder="Enter Name of sChain"
                           onChange={(num) =>
                             this.setState({basName: num.target.value})} value={this.state.basName}/>
                    <br/>
                  </div>

                  <h6 className="like-old">Storage in Bytes</h6>
                  <Input className="new-input" id="basStorageBytes" type="number" size="180"
                         placeholder="Number of bytes this channel can store"
                         onChange={(num) => this.calcDeposit({basStorageBytes: num.target.value})}
                         value={this.state.basStorageBytes}/>
                  <br/>

                  <h6 className="like-old">Lifetime in seconds</h6>
                  <Input className="new-input" id="basLifetime" type="number" size="150" placeholder="Number of seconds this channel will be
                  considered as alive" onChange={(num) => this.setState({basLifetime: num.target.value})}
                         value={this.state.basLifetime}/>
                  <br/>

                  <h6 className="like-old">Max number of nodes</h6>
                  <Input className="new-input" id="basMaxNodes" type="number" size="150" placeholder="Max number of nodes associated with this
                  channel" onChange={(num) =>
                    this.setState({basMaxNodes: num.target.value})} value={this.state.basMaxNodes}/>
                  <br/>

                  {/*<h6 className="like-old">Deposit</h6>
                  <Input className="new-input" id="basDeposit" type="number" size="150"
                         placeholder="Value of tokens associated with this channel"
                         onChange={(num) =>
                           this.setState({basDeposit: num.target.value})} value={this.state.basDeposit}/>
                  <br/>*/}

                  <h6 className="like-old">CPU Time</h6>
                  <Input className="new-input" id="basCpuTime" type="number" size="150" placeholder="CPU Time in %"
                         onChange={(num) =>
                           this.setState({basCpuTime: num.target.value})} value={this.state.basCpuTime}/>
                  <br/>

                  <h6 className="like-old">Transaction Per Second</h6>
                  <Input className="new-input" id="basTransPerSec" type="number" size="150"
                         placeholder="Number Of Transaction Per Second"
                         onChange={(num) =>
                           this.setState({basTransPerSec: num.target.value})} value={this.state.basTransPerSec}/>

                  <div className="padd-top-30 padd-bott-30">
                    <SectionText
                      text="Deposit value"
                      tooltipText="todo: short explanation for the emstimated amount"
                      nopadd={true}
                    />
                    <h3 className="padd-top-sm no-marg">
                      {this.state.basDeposit} SKALE
                    </h3>
                  </div>
                  <Button raised onClick={this.createMchain} disabled={!this.state.libInit}>Create sChain</Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

}
