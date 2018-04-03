import React from 'react'
import Identicon from "../../shared_components/Identicon";
import SectionTitle from "../../shared_components/SectionTitle";

const skale = require('@skale-labs/skale-api');

export default class TransactionsHistory extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      transactionsFrom: [],
      transactionsTo: []
    }
  }

  componentDidMount() {
    this.prepareTransactions();
  }

  componentWillReceiveProps() {
    this.prepareTransactions();
  }

  prepareTransactions() {
    if (!this.props.transactions) return;
    this.setState({
      transactionsFrom: this.transformTransactions(this.props.transactions.from),
      transactionsTo: this.transformTransactions(this.props.transactions.to)
    });
  }

  transformTransactions(transactions){
    let transactionsRes = [];
    transactions.map((transaction) => {
      let floatValue = skale.w3.web3.utils.fromWei(transaction.returnValues._value);
      transactionsRes.push({
        to: transaction.returnValues._to,
        from: transaction.returnValues._from,
        valueWei: transaction.returnValues._value,
        floatValue: parseFloat(floatValue).toFixed(5)
      })
    });
    return transactionsRes;
  }

  render() {
    let transactionsFrom = this.state.transactionsFrom.map((transaction, i) => {
      return (
        <div className="transaction fl-cont fl-center-vert padd-top-15 padd-bott-15 padd-left-10 bord-bott" key={i}>
          <div className="fl-col padd-ri-md">
            <Identicon size={40} hash={transaction.to}/>
          </div>
          <div className="fl-col fl-grow">

          {/*  <h6 className="g-2 fw-5 fs-4 inl">To </h6>*/}
            <h6 className="g-6 fw-5 fs-4 inl">{transaction.to}</h6> <br/>

            <h6 className="g-4 fw-4 fs-2 no-marg padd-top-sm">
              From: {transaction.from}
            </h6>
          </div>
          <div className="fl-col padd-ri-10" style={{textAlign: "right"}}>
            <h6 className="g-6 fw-6 fs-4">{transaction.floatValue} SKALE</h6>
            <h6 className="g-4 fw-4 fs-2 no-marg">{(transaction.floatValue / 850).toFixed(5)} ETH</h6>
          </div>

        </div>);
    });


    let transactionsTo = this.state.transactionsTo.map((transaction, i) => {
      return (
        <div className="transaction fl-cont fl-center-vert padd-top-15 padd-bott-15 padd-left-10 bord-bott" key={i}>
          <div className="fl-col padd-ri-md">
            <Identicon size={40} hash={transaction.from}/>
          </div>
          <div className="fl-col fl-grow">
            {/*<h6 className="g-2 fw-5 fs-4 inl">From </h6>*/}
            <h6 className="g-6 fw-5 fs-4 inl">{transaction.from}</h6> <br/>
            <h6 className="g-4 fw-4 fs-2 no-marg padd-top-sm">
              To: {transaction.to}</h6>
          </div>
          <div className="fl-col padd-ri-10" style={{textAlign: "right"}}>
            <h6 className="g-6 fw-6 fs-4">{transaction.floatValue} SKALE</h6>
            <h6 className="g-4 fw-4 fs-2 no-marg">{(transaction.floatValue / 850).toFixed(5)} ETH</h6>
          </div>

        </div>);
    });

    return (
      <div>
        <SectionTitle
          text="Outgoing transactions"
          nopadd={true}
        />
        <div className="padd-ri-md padd-top-10">
          {transactionsFrom}
        </div>

        <div className="padd-top-30">
          <SectionTitle
            text="Incoming transactions"
            nopadd={true}
          />
          <div className="padd-ri-md padd-top-10">
            {transactionsTo}
          </div>
        </div>
      </div>
    );
  }
}
