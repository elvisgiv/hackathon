import React from 'react'
import Identicon from "../../shared_components/Identicon";
import SectionTitle from "../../shared_components/SectionTitle";
import TransactionTo from "./TransactionTo";
import TransactionFrom from "./TransactionFrom";

const skale = require('@skale-labs/skale-api');

export default class Transactions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: []
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
    let transactions = this.props.from ? this.props.transactions.from : this.props.transactions.to;
    this.setState({
      transactions: this.transformTransactions(transactions)
    });
  }

  transformTransactions(transactions) {
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
    return transactionsRes.reverse();
  }

  render() {
    let from = this.props.from;
    let transactions = this.state.transactions.map((transaction, i) => {
      return from ? <TransactionFrom transaction={transaction} key={i}/> :
        <TransactionTo transaction={transaction} key={i}/>
    });
    return (
      <div>
        <div className="padd-top-md padd-bott-md padd-left-md">
          {transactions}
          {(transactions.length === 0) ?
            <h6 className="padd-left-md padd-top-10 g-6 fw-5 fs-2">No transactions found</h6> : null}
        </div>
      </div>
    );
  }
}
