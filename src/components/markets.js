import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import SearchInput, {createFilter} from 'react-search-input'
import {MdSearch} from 'react-icons/lib/md';

import 'material-components-web/dist/material-components-web.min.css';



const KEYS_TO_FILTERS = ['symbol']


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const markets = [
    'ppt', 'eos', 'qtum', 'cvc', 'storj', 'zrx', 'btm', 'kick', 'veri', 'ebtc', 'fun', 'mnt', 'salt'
]


const mark = {
    ppt: 'Populous',
    eos: 'EOS',
    qtum: 'Qtum',
    cvc: 'Civic',
    storj: 'Storj',
    zrx: '0x',
    btm: 'Bytom',
    kick: 'KickCoin',
    veri: 'Veritaseum',
    ebtc: 'eBitcoin',
    fun: 'FunFair',
    rep: 'Augur',
    salt: 'SALT',
    gnt: 'Golem',
    wtc: 'Walton',
    knc: 'Kyber Network',
    pay: 'TenX',
}


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
            timer: null,
            searchTerm: ''
        };
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
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

        const filteredMarkets = this.state.markets.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        let markets = filteredMarkets.map((item, i) => (
            <Link to={`/exchange/${item.symbol}`} className="undec white-text" key={i.toString()}>
                <div className="fl-cont market bord-bott gx-list-element" >
                    <div className="fl-wrap padd-ri-md">
                            <h5 className="no-marg uppercase">{item.symbol}</h5>
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
            </Link>
        ))




        return (
            <div className="gx-card padd-md marg-30 no-marg-left">

                <div className="fl-cont  fl-center-vert padd-10 marg-bott-md">

                    <div className="fl-wrap fl-grow">
                        <h3 className="bold no-marg">Markets</h3>
                    </div>

                    <div className="fl-wrap ">

                        <div className="fl-cont fl-center-h search-wrap">

                            <div className="fl-wrap fl-grow">
                                <SearchInput className="gx-search-input" onChange={this.searchUpdated} />
                            </div>
                            <div className="fl-wrap">
                                <MdSearch className="sm-icon lt-gr-svg"/>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="padd-10">
                    {markets}
                </div>

            </div>



        );
    }
}
