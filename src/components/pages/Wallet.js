import React from 'react'
/*import {Link} from 'react-router-dom'

import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";
import FromEth from "./fromEth";

import { Modal, Collapse } from 'reactstrap';*/


import PageTitle from "../shared_components/PageTitle";
import CardTitle from "../shared_components/CardTitle";
import SectionTitle from "../shared_components/SectionTitle";
// import SectionTitle from "../../shared/sectionTitle";
import CardInfo from "../shared_components/CardInfo";

import {Button, ButtonIcon} from 'rmwc/Button';
import { Modal } from 'reactstrap';

const skale = require('@skale-labs/skale-api');
import ethLogo from '../../images/coins/eth.png';
import skaleLogo from '../../images/coins/skale.jpg';
// import FromSkale from "./fromSkale";

export default class BotExchange extends React.Component {

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
/*
      let buySkl = <FromEth web3Connector={this.props.web3Connector} fatherToggle={this.toggle}/>;
      let sellSkl = <FromSkale web3Connector={this.props.web3Connector} fatherToggleColl={this.toggleColl}/>;*/

      return (
      <div className='marg-30'>
        <PageTitle
          title="Wallet"
          subtitle="Here you can see your balance in the MetaMask."
        />
        <div className="skale-card padd-30 marg-bott-30">
          <div className="padd-bott-10">
            <CardTitle icon="account_balance_wallet" text="Account"/>
            <div className="card-content padd-top-30 padd-left-md">
              <CardInfo
                k="Web3 provider"
                value="Metamask"
              />
              <CardInfo
                k="Balance for the account"
                value={this.state.account}
                tooltipText="Balance for the account currently selected in Metamask"
              />
              <div className="fl-cont fl-center-vert padd-top-10 padd-left-md">
                <div className="fl-col padd-ri-10 fl-center" style={{width: "40px"}}>
                  <img src={ethLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col">
                  <h5 className="no-marg inl">{this.state.eth}</h5>
                  <h5 className="no-marg padd-left-sm lite-gr-col inl"> ETH </h5>
                </div>
              </div>
              <div className="fl-cont fl-center-vert padd-top-md padd-left-md">
                <div className="fl-col padd-ri-10">
                  <img src={skaleLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col">
                  <h5 className="no-marg inl">{this.state.skl} </h5>
                  <h5 className="no-marg padd-left-sm lite-gr-col inl"> SKALE </h5>
                </div>
              </div>
            </div>


            <div className="divider"></div>

            <CardTitle icon="compare_arrows" text="Transfer"/>
            <div className="card-content">
              <SectionTitle
                text="Send and receive SKALE tokens"
              />

              <div className="fl-cont padd-left-md">
                <div className="fl-col padd-ri-md">
                  <Button unelevated className="grdeen-btn" onClick={this.toggleSend} style={{minWidth: "135px"}}>
                    <ButtonIcon use="call_made"/>Send</Button>
                  <Modal isOpen={this.state.modalSend} toggle={this.toggleSend}>
                    dddddddddddd
                  </Modal>
                </div>
                <div className="fl-col padd-ri-md">
                  <Button unelevated className="redd-btn" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                    <ButtonIcon use="call_received"/>Receive</Button>
                  <Modal isOpen={this.state.modalReceive} toggle={this.toggleReceive}>
                    dddddddddddd
                  </Modal>
                </div>
                <div className="fl-col padd-ri-md">
                  <Button unelevated className="lite-btn" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                    <ButtonIcon use="shopping_cart"/>Buy</Button>
                </div>
              </div>


              {/*<div className="padd-top-md">
                <Button unelevated className="marg-ri-md" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                  <ButtonIcon use="shopping_cart"/> Buy
                </Button>
                <Button unelevated className="lite-btn marg-ri-md" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                  <ButtonIcon use="shopping_cart"/> Buy
                </Button>
                <Button unelevated className="border-btn marg-ri-md" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                  <ButtonIcon use="shopping_cart"/> Buy
                </Button>
                <Button unelevated className="link-btn marg-ri-md" onClick={this.toggleReceive} style={{minWidth: "135px"}}>
                  <ButtonIcon use="shopping_cart"/> Buy
                </Button>
              </div>*/}



            </div>


                {/*<div className="fl-cont fl-center-vert padd-left-md padd-top-big">
                  <div className="fl-col padd-ri-10 fl-center" style={{width: "40px"}}>
                    <img src={ethLogo} className="wallet-coin" style={{height: "30px"}}/>
                  </div>
                  <div className="fl-col padd-ri-30">
                    <h5 className="no-marg inl">{this.state.botEth}</h5>
                    <h5 className="no-marg padd-left-sm lite-gr-col inl"> ETH </h5>
                  </div>
                  <div className="fl-col">
                    <ReturnEth web3Connector={this.props.web3Connector}/>
                  </div>
                </div>

                <div className="fl-cont fl-center-vert padd-top-md padd-left-md">
                  <div className="fl-col padd-ri-10">
                    <img src={skaleLogo} className="wallet-coin" style={{height: "30px"}}/>
                  </div>
                  <div className="fl-col padd-ri-30">
                    <h5 className="no-marg inl">{this.state.botSkale} </h5>
                    <h5 className="no-marg padd-left-sm lite-gr-col inl"> SKALE </h5>
                  </div>
                  <div className="fl-col">
                    <ReturnSkl web3Connector={this.props.web3Connector}/>
                  </div>
                </div>*/}

              </div>
            </div>

      </div>

    )
  }
}
