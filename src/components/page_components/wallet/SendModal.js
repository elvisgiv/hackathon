import React from 'react'

import CardTitle from "../../shared_components/CardTitle";
import SectionText from "../../shared_components/SectionText";

import {Button} from 'rmwc/Button';
import {Input} from 'reactstrap';
import Admonition from "../../shared_components/Admonition";

const skale = require('@skale-labs/skale-api');

export default class SendModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gasFee: 0.008
      //skaleVal: 0
    }
  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      skale.initBothProviders('51.0.1.99', '8546', provider);
      this.setState({libInit: true});
    }
  }

  async sendSkale() {
    let accounts = await skale.w3.web3.eth.getAccounts();
    let weiVal = skale.w3.web3.utils.toWei(this.state.skaleVal.toString());
    let res = await skale.token().transfer({from: accounts[0], to: this.state.address, amount: weiVal});
    this.props.ToggleSend();
    this.props.showSnackbar('Tokens sent');
  }

  render() {
    return (
      <div className="padd-30">
        <CardTitle icon="call_made" text="Send SKALE"/>

        <Admonition className='marg-top-30'
                    type="warning"
                    title="Warning"
                    text="Please verify recipient address. We cannot refund an incorrect transaction."/>


        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Amount of SKALE"
            nopadd={true}
          />
        </div>


        <div className='new-input fl-cont fl-center-h'>
          <div className='fl-col fl-grow'>
            <Input className='flat-input' type="number" placeholder="
                        SKALE amount"
                   onChange={(num) =>
                     this.setState({skaleVal: num.target.value})}
                   value={this.state.skaleVal}/>
          </div>
          <div className='fl-col padd-left-10'>
            <p className='no-marg fw-8 g-6 fs-4'>
              SKALE
            </p>
          </div>
        </div>

        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Recipient address"
            nopadd={true}
          />
        </div>
        <div className="">
          <Input className="new-input" id="buySkl" type="text" size="150" placeholder="
                        MetaMask address"
                 onChange={(num) =>
                   this.setState({address: num.target.value})}
                 value={this.state.address}/>
        </div>


        <div className="padd-top-30 padd-bott-30 bord-bott">
          <SectionText
            text="Gas fee"
            tooltipText="We calculate the suggested gas prices based on network success rates."
            nopadd={true}
          />

          <div className='new-input disabled-input fl-cont fl-center-h marg-top-10'>
            <div className='fl-col fl-grow'>
              <Input disabled className='flat-input' type="number" placeholder="
                        SKALE amount"
                     onChange={(num) =>
                       this.setState({gasFee: num.target.value})}
                     value={this.state.gasFee}/>
            </div>
            <div className='fl-col padd-left-10'>
              <p className='no-marg fw-8 g-6 fs-4'>
                ETH
              </p>
            </div>
          </div>

          {/*<p className='no-marg padd-top-sm g-6 fw-6 fs-6'>0.0008 ETH</p>*/}

        </div>


        <div className="padd-top-md">
          <div className="padd-top-10">
            <Button unelevated className="green-btn"
                    onClick={() => {
                      this.sendSkale();
                    }}
                    disabled={!this.state.libInit}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.props.ToggleSend}>Cancel</Button>
          </div>
        </div>


      </div>
    );
  }
}
