import React from 'react'
import {Link} from 'react-router-dom'

import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";

import {Button, ButtonIcon} from 'rmwc/Button';

const Identicon = require('identicon.js');

const skale = require('@skale-labs/skale-api');
import ethLogo from '../../../images/coins/eth.png';
import skaleLogo from '../../../images/coins/skale.jpg';

export default class BotExchange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      skale.initBothProviders('51.0.1.99', '8546', provider);
      this.setState({libInit: true});
      this.initBalanceChecker();
    }
    this.initAvatarData();
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
      eth: accountEthBalance,
      botEth: skaleBotEthBalance,
      botSkale: skaleBotSkaleBalance
    });
  }

  async initAvatarData() {
    let accounts = await skale.w3.getAccounts();
    let account = accounts[0];
    this.setState({
      avatarData: new Identicon(account, {margin: 0.2, size: 35}).toString()
    });

  }

  render() {

    let returnEth = <ReturnEth web3Connector={this.props.web3Connector}/>;
    let returnSkl = <ReturnSkl web3Connector={this.props.web3Connector}/>;

    return (
      <div className='marg-30'>
        <div className="skale-card mdc-elevation--z4 marg-bott-30" style={{maxWidth: '750px'}}>
          <div>
            <div className="fl-cont fl-center-vert card-top">
              <div className="fl-col padd-ri-10">
                {this.state.avatarData ? <img width={35} height={35} style={{borderRadius: "10px"}}
                                              src={"data:image/png;base64," + this.state.avatarData}/> : null}
              </div>
              <div className="fl-col">
                <h6 className="bold no-marg">{this.state.account}</h6>
              </div>
            </div>


            <div className="card-content padd-30">

              <div className="fl-cont fl-center-vert">
                <div className="fl-col padd-ri-10 fl-center" style={{width: "40px"}}>
                  <img src={ethLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col">
                  <h5 className="no-marg inl">{this.state.eth}</h5>
                  <h5 className="no-marg padd-left-sm lite-gr-col inl"> ETH </h5>
                </div>
              </div>

              <div className="fl-cont fl-center-vert padd-top-md">
                <div className="fl-col padd-ri-10">
                  <img src={skaleLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col">
                  <h5 className="no-marg inl">{this.state.skl} </h5>
                  <h5 className="no-marg padd-left-sm lite-gr-col inl"> SKL </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="skale-card mdc-elevation--z4" style={{maxWidth: '750px'}}>
          <div className="fl-cont fl-center-vert card-top">
            <div className="fl-col">
              <h6 className="bold no-marg">Skale Bot</h6>
            </div>
          </div>
          <div className="padd-30">

            <div className="fl-cont">
              <div className="fl-col padd-ri-md">
                <Link to='/exchange-skl' className="undec">
                  <Button unelevated className="green-btn"><ButtonIcon use="call_received" />Buy SKL</Button>
                </Link>
              </div>
              <div className="fl-col">
                <Link to='/exchange-eth' className="undec">
                  <Button unelevated className="red-btn"><ButtonIcon use="call_made" />Sell SKL</Button>
                </Link>
              </div>
            </div>




            <div className="padd-top-30">
              <h5 className="no-marg">Your exchange refunds</h5>

              <div className="fl-cont fl-center-vert marg-top-md">
                <div className="fl-col padd-ri-10 fl-center" style={{width: "40px"}}>
                  <img src={ethLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col padd-ri-30">
                  <h6 className="no-marg inl">{this.state.botEth}</h6>
                  <h6 className="no-marg padd-left-sm lite-gr-col inl"> ETH </h6>
                </div>
                <div className="fl-col">
                  {returnEth}
                </div>
              </div>

              <div className="fl-cont fl-center-vert padd-top-md">
                <div className="fl-col padd-ri-10">
                  <img src={skaleLogo} className="wallet-coin" style={{height: "30px"}}/>
                </div>
                <div className="fl-col padd-ri-30">
                  <h6 className="no-marg inl">{this.state.botSkale} </h6>
                  <h6 className="no-marg padd-left-sm lite-gr-col inl"> SKL </h6>
                </div>
                <div className="fl-col">
                  {returnSkl}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>


    )

  }

}
