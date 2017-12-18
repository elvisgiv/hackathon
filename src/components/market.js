import React from 'react'
import {Link} from 'react-router-dom'

export default class Market extends React.Component {

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this)
    }

    _onClick() {
        this.props.changeMarket(this.props.market);
    }

    render() {
        return (
            <div>
                <Link to={`/exchange/${this.props.market.symbol}`} className="undec white-text" onClick={this._onClick}>
                    <div
                        className={"fl-cont market bord-bottt gx-list-element " + (this.props.market.symbol === this.props.currentMarket.symbol ? 'gx-list-selected' : '')}>
                        <div className="fl-wrap padd-ri-md padd-left-10">
                            <h5 className="no-marg uppercase">{this.props.market.symbol}</h5>
                        </div>
                        <div className="fl-wrap padd-ri-md">
                            <h5 className="regular no-marg">{this.props.market.price}</h5>
                        </div>
                        <div className="fl-wrap padd-ri-md">
                            <h5 className={'regular no-marg ' + (this.props.market.change > 0 ? 'green-text' : 'red-text')}>{this.props.market.change}%</h5>
                        </div>
                        <div className="fl-wrap padd-ri-md">
                            <h5 className="regular no-marg">{this.props.market.volume}</h5>
                        </div>
                    </div>
                </Link>
            </div>
        )

    }

}
