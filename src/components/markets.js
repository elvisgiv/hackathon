import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'

import MarketTest from './market'
import 'material-components-web/dist/material-components-web.min.css';

import {MdSearch} from 'react-icons/lib/md';


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const markets = [
    'ppt', 'eos', 'qtum', 'cvc', 'storj', 'zrx', 'btm', 'kick', 'veri', 'ebtc', 'fun', 'mnt', 'salt'
]

function generateMarketsData() {
    let marketsData = []


    for ( let i = 0; i < markets.length; i++ ) {
        marketsData[ i ] = {
            symbol: markets[i],
            price: (Math.random() * getRandomInt(1, 3)).toFixed(4),
            volume: (Math.random() * getRandomInt(1000, 5000)).toFixed(4),
            change: (getRandomArbitrary(-100, 100)).toFixed(4),
        }
    }

    return marketsData
}




export default class Markets extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markets: generateMarketsData(),
            timer: null
        };
    }

    componentDidMount() {
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    markets: generateMarketsData()
                });
            }, 4000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {

        //const filteredMarkets = this.state.coins.filter(createFilter(this.props.searchTerm, KEYS_TO_FILTERS));

        let markets = this.state.markets.map((item, i) => (
            <div className="fl-cont market bord-bott" key={i.toString()}>
                <div className="fl-wrap padd-ri-md">
                    <Link to={`/exchange/${item.symbol}`} className="undec white-text">
                        <h5 className="no-marg uppercase">{item.symbol}</h5>
                    </Link>
                </div>
                <div className="fl-wrap padd-ri-md">
                    <h5 className="regular no-marg">{item.price}</h5>
                </div>
                <div className="fl-wrap padd-ri-md">
                    <h5 className={ 'regular no-marg ' + (item.change > 0 ? 'green-text' : 'red-text') } >{item.change}%</h5>
                </div>
                <div className="fl-wrap padd-ri-md">
                    <h5 className="regular no-marg">{item.volume}</h5>
                </div>
            </div>
        ))




        return (
            <div className="gx-card padd-md marg-30 no-marg-left">

                <div className="fl-cont padd-10">

                    <div className="fl-wrap fl-grow">
                        <h3 className="bold no-marg">Markets</h3>
                    </div>

                    <div className="fl-wrap ">
                        <MdSearch className="gx-icon lt-gr-svg"/>
                    </div>
                </div>

                <div className="padd-10">
                    {markets}
                </div>

            </div>



        );
    }
}
