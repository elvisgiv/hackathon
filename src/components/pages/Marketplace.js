import React from 'react'

import ReturnEth from "../page_components/maketplace/ReturnEth";
import ReturnSkl from "../page_components/maketplace/ReturnSkl";
import FromEth from "../page_components/maketplace/FromEth";

import { Modal, Collapse } from 'reactstrap';


import PageTitle from "../shared_components/PageTitle";
import CardTitle from "../shared_components/CardTitle";
import SectionTitle from "../shared_components/SectionTitle";

import {Button, ButtonIcon} from 'rmwc/Button';

const skale = require('@skale-labs/skale-api');

import ethLogo from '../../images/coins/eth.png';
import skaleLogo from '../../images/coins/skale.jpg';
import FromSkale from "../page_components/maketplace/FromSkale";

export default class Marketplace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        collapse: false,
        timer: null,

    };

    this.toggle = this.toggle.bind(this);
    this.toggleColl = this.toggleColl.bind(this);

  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      skale.initBothProviders('51.0.1.99', '8546', provider);
      this.setState({libInit: true});
      this.initBalanceChecker();
    }
  }

  initBalanceChecker() {
    this.checkBalances();
    this.setState({
      timer: setInterval(() => {
        this.checkBalances()
      }, 5000),
    });
  }

  async checkBalances() {
    let accounts = await skale.w3.getAccounts();
    let account = accounts[0];
    let skaleBotAccountInfo = await skale.bot().getInfoForAccount(account);

    let accountSkaleWeiBalance = await skale.token().balanceOf(account);
    let accountSkaleBalance = skale.w3.web3.utils.fromWei(accountSkaleWeiBalance.toString());

    let accountEthWeiBalance = await skale.w3.web3.eth.getBalance(account);
    let accountEthBalance = skale.w3.web3.utils.fromWei(accountEthWeiBalance.toString());

    let skaleBotSkaleBalance = skale.w3.web3.utils.fromWei(skaleBotAccountInfo.sendGex.toString());
    let skaleBotEthBalance = skale.w3.web3.utils.fromWei(skaleBotAccountInfo.sendEth.toString());

    this.setState({
      account: account,
      skl: parseFloat(accountSkaleBalance).toFixed(3),
      eth: parseFloat(accountEthBalance).toFixed(3),
      botEth: parseFloat(skaleBotEthBalance).toFixed(3),
      botSkale: parseFloat(skaleBotSkaleBalance).toFixed(3)
    });
  }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleColl() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

  render() {

      let buySkl = <FromEth web3Connector={this.props.web3Connector} fatherToggle={this.toggle}/>;
      let sellSkl = <FromSkale web3Connector={this.props.web3Connector} fatherToggleColl={this.toggleColl}/>;

      return (
      <div className='marg-30'>
        <PageTitle
          title="Marketplace"
          subtitle="Here you can buy or sell SKALE."
        />
        <div className="skale-card padd-30 marg-bott-30">
          <div className="padd-bott-10">

            <CardTitle icon="star_rate" text="Marketplace"/>
            <div className="card-content">
              <SectionTitle
                text="You can buy and sell SKALE tokens using our Skale Exchange Bot"
                tooltipText="todo: short explanation for the Skale Bot"
              />
              <div className="fl-cont padd-left-md">
                <div className="fl-col padd-ri-md">
                    <Button unelevated className="green-btn" onClick={this.toggle}>
                        {/*<ButtonIcon use="call_received"/>*/}Buy SKALE</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        {buySkl}
                    </Modal>
                </div>
                <div className="fl-col">
                    <Button unelevated className="red-btn" onClick={this.toggleColl}>
                        {/*<ButtonIcon use="call_made"/>*/}Sell SKALE</Button>
                    <Modal isOpen={this.state.collapse} toggle={this.toggleColl}>
                        {sellSkl}
                    </Modal>
                </div>
              </div>

              <div className="padd-top-30">
                <SectionTitle
                  text="Your exchange refunds"
                  tooltipText="todo: short explanation for the exchange refunds"
                />


                <table>
                  <tbody>
                  <tr>
                    <td>
                      <div className="fl-cont fl-center-vert padd-left-md">
                        <div className="fl-col padd-ri-10 fl-center" style={{width: "40px"}}>
                          <img src={ethLogo} className="wallet-coin" style={{height: "30px"}}/>
                        </div>
                        <div className="fl-col padd-ri-30">
                          <h5 className="no-marg inl">{this.state.botEth}</h5>
                          <h5 className="no-marg padd-left-sm lite-gr-col inl"> ETH </h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fl-col">
                        <ReturnEth web3Connector={this.props.web3Connector}/>
                      </div>
                    </td>
                  </tr>
                  <tr >
                    <td>
                      <div className="fl-cont fl-center-vert padd-left-md padd-top-md">
                        <div className="fl-col padd-ri-10">
                          <img src={skaleLogo} className="wallet-coin" style={{height: "30px"}}/>
                        </div>
                        <div className="fl-col padd-ri-30">
                          <h5 className="no-marg inl">{this.state.botSkale} </h5>
                          <h5 className="no-marg padd-left-sm lite-gr-col inl"> SKALE </h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fl-col padd-top-md">
                        <ReturnSkl web3Connector={this.props.web3Connector}/>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
