import React from 'react'
import Identicon from "../../shared_components/Identicon";

export default class TransactionFrom extends React.Component {
  render() {
    return (
      <div className="transaction fl-cont fl-center-vert padd-top-15 padd-bott-15 padd-left-10 bord-bott" key={this.props.i}>
        <div className="fl-col padd-ri-md">
          <Identicon size={40} hash={this.props.transaction.to}/>
        </div>
        <div className="fl-col fl-grow">
          <h6 className="g-6 fw-5 fs-4 inl">{this.props.transaction.to}</h6> <br/>
          <h6 className="g-4 fw-4 fs-2 no-marg padd-top-sm">
            From: {this.props.transaction.from}
          </h6>
        </div>
        <div className="fl-col padd-ri-10" style={{textAlign: "right"}}>
          <h6 className="g-6 fw-6 fs-4">{this.props.transaction.floatValue} SKALE</h6>
          <h6 className="g-4 fw-4 fs-2 no-marg">{(this.props.transaction.floatValue / 850).toFixed(5)} ETH</h6>
        </div>
      </div>
    );
  }
}
