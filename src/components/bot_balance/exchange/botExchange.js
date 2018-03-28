import React from 'react'
import {Link} from 'react-router-dom'

import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";

import {Button} from 'rmwc/Button';
const Identicon = require('identicon.js');

const skale = require('@skale-labs/skale-api');




export default class BotExchange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      skale.initBothProviders('51.0.1.99', '8546', provider);
      this.setState({libInit: true});
      this.initBalanceChecker();
      this.initAvatarData();
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
      skl: accountSkaleBalance,
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
        <div className="skale-card mdc-elevation--z4" style={{maxWidth: '750px'}}>
          <div>
            <div className="fl-cont fl-center-vert card-top">
              <div className="fl-col padd-ri-10">
                {this.state.avatarData ? <img width={35} height={35} style={{borderRadius: "10px"}} src={"data:image/png;base64,"+this.state.avatarData}/> : null}
              </div>
              <div className="fl-col">
                <h6 className="bold no-marg">{this.state.account}</h6>
              </div>
            </div>


            <div className="card-content padd-30">

              <div className="fl-cont fl-center-vert">
                <div className="fl-col padd-ri-10">
                  {this.state.avatarData ? <img width={35} height={35} style={{borderRadius: "10px"}} src={"data:image/png;base64,"+this.state.avatarData}/> : null}
                </div>
                <div className="fl-col">
                  <h6 className="no-marg">{this.state.eth} ETH </h6>
                </div>
              </div>


              <span style={{fontWeight: 'bold'}}>ETH: </span>
              {this.state.eth}
              <br/>
              <Link to='/exchange-eth' className="undec">
                <Button dense>Sell SKL</Button>
              </Link>
              <br/>
              <br/>
              <span style={{fontWeight: 'bold'}}>SKL: </span>
              {this.state.skl}
              <br/>
              <Link to='/exchange-skl' className="undec">
                <Button dense>Buy SKL</Button>
              </Link>
            </div>

          </div>
        </div>
        <br/>

        <div className="skale-card mdc-elevation--z4" style={{maxWidth: '750px'}}>
          <div className="fl-cont fl-center-vert card-top">
            <div className="fl-col">
              <h6 className="bold no-marg">Skale Bot</h6>
            </div>
          </div>
          <div className="padd-30">
            <span style={{fontWeight: 'bold'}}>ETH:</span>
            {this.state.botEth}
            <br/>
            {returnEth}
            <br/>
            <br/>
            <span style={{fontWeight: 'bold'}}>SKL:</span>
            {this.state.botSkale}
            <br/>
            {returnSkl}
          </div>
        </div>

      </div>


    )

  }

}
