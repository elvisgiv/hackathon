import React from 'react'

import CardTitle from "../../shared_components/CardTitle";
import SectionText from "../../shared_components/SectionText";

import {Button} from 'rmwc/Button';
import { Input } from 'reactstrap';

const skale = require('@skale-labs/skale-api');

export default class SendModal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
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

        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Amount of SKALE"
            nopadd={true}
          />
        </div>

        <Input className="new-input" id="buySkl" type="number" size="150" placeholder="
                        SKALE amount"
               onChange={(num) =>
                 this.setState({skaleVal: num.target.value})}
               value={this.state.skaleVal}/>

        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Recipient address"
            nopadd={true}
          />
        </div>


        <div className="bord-bott padd-bott-30">
          <Input className="new-input" id="buySkl" type="text" size="150" placeholder="
                        ETH address"
                 onChange={(num) =>
                   this.setState({address: num.target.value})}
                 value={this.state.address}/>
        </div>

        <div className="padd-top-md">
          {/*<SectionText
            text="Confirm the transaction"
            //tooltipText="todo: short explanation for the metamask popup"
            nopadd={true}
          />
*/}
          <div className="padd-top-10">
            <Button unelevated className="green-btn"
                    onClick={() => {
                      this.sendSkale();
                    }}
                    disabled={!this.state.libInit}
            >
              Confirm
            </Button>
            <Button color="secondary" onClick={this.props.ToggleSend}>Cancel</Button>
          </div>
        </div>


      </div>
    );
  }
}
