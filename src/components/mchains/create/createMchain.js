import React from 'react'
import { Redirect } from 'react-router'

import {Row, Container, Tooltip} from 'reactstrap';

import {TextField, TextFieldHelperText} from 'rmwc/TextField';
import {Icon} from 'rmwc/Icon';
import {Button} from 'rmwc/Button';


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
    if(this.state[fieldName] !== undefined){
      let newState = {};
      newState[fieldName] = !this.state[fieldName];
      this.setState(newState);
    }
  }

  render() {
    const { sChainsPage } = this.state;

    if (sChainsPage) {
      return <Redirect to="/schains" push={true} />
    }

    return (
      <div className="marg-30">

          <div className="fl-wrap fl-grow">
              <h2 className="no-marg">Create sChain</h2>
              <p className="sb-p-text">
                  Create your own Skale-chanel with custom characteristics.
              </p>
              <p className="sb-p-text">
                  After filling all fields push "create schain" button, a MetaMask pop-up window will appear.
                  To provide a transaction, you must click "submit" on it.              </p>
          </div>
          <br/>

        <div className="skale-card mdc-elevation--z4" style={{maxWidth: '750px'}}>
          <div className="fl-cont fl-center-vert card-top">
            <div className="fl-col">
              <h6 className="bold no-marg">Fill these fields to create an sChain</h6>
            </div>
          </div>
          <div className="padd-30">

            <TextField className="skale-field no-marg-top" label="Name of sChain" id="basName" type="text" onChange={(num) =>
              this.setState({basName: num.target.value})} value={this.state.basName}/>
            <br/>
            <br/>

            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field" id="basStorageBytes" type="number" size="180" label="Storage in Bytes"
                           onChange={(num) =>
                             this.setState({basStorageBytes: num.target.value})} value={this.state.basStorageBytes} onFocus={() => this.toggle('tooltipStorageBytes')} onBlur={() => this.toggle('tooltipStorageBytes')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipStorageBytes" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipStorageBytes} target="TooltipStorageBytes" toggle={() => this.toggle('tooltipStorageBytes')}>
                  Number of bytes this channel can store
                </Tooltip>
              </div>
            </div>

            <br/>

            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field" id="basLifetime" type="number" size="150" label="Lifetime in seconds" onChange={(num) =>
                  this.setState({basLifetime: num.target.value})} value={this.state.basLifetime} onFocus={() => this.toggle('tooltipLifetime')} onBlur={() => this.toggle('tooltipLifetime')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipLifetime" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipLifetime} target="TooltipLifetime" toggle={() => this.toggle('tooltipLifetime')}>
                  Number of seconds this channel will be considered as alive
                </Tooltip>
              </div>
            </div>

            <br/>

            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field" id="basMaxNodes" type="number" size="150" label="Max number of nodes" onChange={(num) =>
                  this.setState({basMaxNodes: num.target.value})} value={this.state.basMaxNodes} onFocus={() => this.toggle('tooltipMaxNodes')} onBlur={() => this.toggle('tooltipMaxNodes')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipMaxNodes" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipMaxNodes} target="TooltipMaxNodes" toggle={() => this.toggle('tooltipMaxNodes')}>
                  Max number of nodes associated with this channel
                </Tooltip>
              </div>
            </div>

            <br/>


            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field" id="basDeposit" type="number" size="150" label="Deposit" onChange={(num) =>
                  this.setState({basDeposit: num.target.value})} value={this.state.basDeposit} onFocus={() => this.toggle('tooltipDeposit')} onBlur={() => this.toggle('tooltipDeposit')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipDeposit" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipDeposit} target="TooltipDeposit" toggle={() => this.toggle('tooltipDeposit')}>
                  Value of tokens associated with this channel
                </Tooltip>
              </div>
            </div>

            <br/>


            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field" id="basCpuTime" type="number" size="150" label="CPU Time" onChange={(num) =>
                  this.setState({basCpuTime: num.target.value})} value={this.state.basCpuTime} onFocus={() => this.toggle('tooltipCpuTime')} onBlur={() => this.toggle('tooltipCpuTime')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipCpuTime" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipCpuTime} target="TooltipCpuTime" toggle={() => this.toggle('tooltipCpuTime')}>
                  CPU Time in %
                </Tooltip>
              </div>
            </div>

            <br/>

            <div className="fl-cont fl-center-vert">
              <div className="fl-wrap">
                <TextField className="skale-field"  id="basTransPerSec" type="number" size="150" label="Transaction Per Second" onChange={(num) =>
                  this.setState({basTransPerSec: num.target.value})} value={this.state.basTransPerSec} onFocus={() => this.toggle('tooltipTransPerSec')} onBlur={() => this.toggle('tooltipTransPerSec')}/>
              </div>
              <div className="fl-wrap gx-icon marg-left-md padd-top-sm">
                <Icon strategy="ligature" id="TooltipTransPerSec" className="lite-gr-col">info_outline</Icon>
                <Tooltip placement="right" isOpen={this.state.tooltipTransPerSec} target="TooltipTransPerSec" toggle={() => this.toggle('tooltipTransPerSec')}>
                  Number Of Transaction Per Second
                </Tooltip>
              </div>
            </div>

            <br/>
            <br/>


            <Button raised onClick={this.createMchain} disabled={!this.state.libInit}>Create sChain</Button>

          </div>
        </div>

      </div>
    )

  }

}
