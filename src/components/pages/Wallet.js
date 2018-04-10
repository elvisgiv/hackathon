import React from 'react'
import {Link} from 'react-router-dom'

import SendModal from "../page_components/wallet/SendModal";
import Transactions from "../page_components/wallet/Transactions";
import ReceiveModal from "../page_components/wallet/ReceiveModal";
import Account from "../page_components/wallet/Account";

import PageTitle from "../shared_components/PageTitle";
import SectionText from "../shared_components/SectionText";
import CardInfo from "../shared_components/CardInfo";
import { Accordion, AccordionPart, AccordionHeader, AccordionContent } from '../shared_components/accordion/Accordion'
import SkaleCard from '../shared_components/SkaleCard'

import {CopyToClipboard} from 'react-copy-to-clipboard';

import {Button, ButtonIcon} from 'rmwc/Button';
import {Snackbar} from 'rmwc/Snackbar';
import {Modal, Collapse} from 'reactstrap';

const skale = require('@skale-labs/skale-api');
import ethLogo from '../../images/coins/eth.png';
import skaleLogo from '../../images/coins/skale.jpg';


export default class BotExchange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      receiveModal: false,
      sendModal: false,
      collapse: false
    };

    this.toggleReceive = this.toggleReceive.bind(this);
    this.toggleSend = this.toggleSend.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      skale.initBothProviders('51.0.1.99', '8546', provider);
      this.setState({libInit: true});
      this.initBalanceChecker();
      this.initTransactionsChecker();
    }
  }

  initBalanceChecker() {
    this.checkBalances();
    this.setState({
      timer: setInterval(() => {
        this.checkBalances()
      }, 3000),
    });
  }

  initTransactionsChecker() {
    this.getTransactions();
    this.setState({
      transactionsTimer: setInterval(() => {
        this.getTransactions()
      }, 3000),
    });
  }

  async getTransactions() {
    let accounts = await skale.w3.getAccounts();
    let account = accounts[0];
    let transfers = await skale.token().getTransferHistory(account);
    this.setState({transactions: transfers})
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


  toggleReceive() {
    this.setState({
      receiveModal: !this.state.receiveModal
    });
  }

  toggleSend() {
    this.setState({
      sendModal: !this.state.sendModal
    });
  }

  showSnackbar(message) {
    this.setState({
      snackbarIsOpen: !this.state.snackbarIsOpen,
      snackbarMessage: message
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {

    let account = (
      <div className="card-content padd-top-30 padd-bott-md padd-left-md">
        <CardInfo
          k="Web3 provider"
          value="Metamask"
        />
        <CardInfo
          k="Balance for the account"
          value={this.state.account}
          tooltipText="Balance for the account currently selected in Metamask"
        />

        <div className="padd-left-md padd-bott-10">
          <div className="fl-cont fl-center-vert padd-top-10">
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
              <h5 className="no-marg padd-left-sm lite-gr-col inl"> SKALE </h5>
            </div>
          </div>
        </div>


        <div className="padd-top-md">
          <SectionText
            text="Send and receive SKALE tokens"
          />

          <div className="fl-cont padd-left-md">
            <div className="fl-col padd-ri-md">
              <Button unelevated className="grdeen-btn" onClick={this.toggleSend} style={{minWidth: "135px"}}>
                <ButtonIcon use="call_made"/>Send</Button>
              <Modal isOpen={this.state.sendModal} toggle={this.toggleSend}>
                <SendModal showSnackbar={this.showSnackbar} ToggleSend={this.toggleSend} web3Connector={this.props.web3Connector}/>
              </Modal>
            </div>
            <div className="fl-col padd-ri-md">
              <CopyToClipboard text={this.state.account}
                               onCopy={() => this.setState({copied: true})}>
                <Button unelevated className="redd-btn" style={{minWidth: "135px"}}
                        onClick={evt => this.setState({
                          snackbarIsOpen: !this.state.snackbarIsOpen,
                          snackbarMessage: "Address copied to clipboard"
                        })}>
                  <ButtonIcon use="call_received"/>Receive</Button>
              </CopyToClipboard>
              <Modal isOpen={this.state.receiveModal} toggle={this.toggleReceive}>
                <ReceiveModal/>
              </Modal>
            </div>
            <div className="fl-col padd-ri-md">
              <Link to='/marketplace' className="undec">
                <Button unelevated className="lite-btn" style={{minWidth: "135px"}}>
                  <ButtonIcon use="shopping_cart"/>
                  Buy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );


    return (
      <div className='marg-30'>
        <PageTitle
          title="Wallet"
          subtitle="Manage SKALE tokens: Send, receive, buy and view transactions"
        />

        <SkaleCard>
          <Accordion>
            <AccordionPart collapse={true}>
              <AccordionHeader icon="account_balance_wallet" text="Account"/>
              <AccordionContent>
                {account}
              </AccordionContent>
            </AccordionPart>
            <AccordionPart>
              <AccordionHeader icon="call_made" text="Outgoing transactions"/>
              <AccordionContent>
                <Transactions from transactions={this.state.transactions}/>
              </AccordionContent>
            </AccordionPart>
            <AccordionPart last={true}>
              <AccordionHeader icon="call_received" text="Incoming transactions"/>
              <AccordionContent>
                <Transactions to transactions={this.state.transactions}/>
              </AccordionContent>
            </AccordionPart>
          </Accordion>
        </SkaleCard>

        <Snackbar
          show={this.state.snackbarIsOpen}
          onHide={evt => this.setState({snackbarIsOpen: false})}
          message={this.state.snackbarMessage}
          actionText="Hide"
          actionHandler={() => {
          }}
        />
      </div>
    )
  }
}
