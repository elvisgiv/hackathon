import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import {MdSearch} from 'react-icons/lib/md';
import 'material-components-web/dist/material-components-web.min.css';

import Market from './market'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

//import '../helpers'
import GexHelpers from "../gexHelpers"

// search
const KEYS_TO_FILTERS = ['symbol'];

const marketsInfo = [
    ['ppt', 'Populous', 'svg'],
    ['eos', 'EOS', 'svg'],
    ['qtum', 'Qtum', 'svg'],
    ['cvc', 'Civic', 'svg'],
    ['storj', 'Storj', 'svg'],
    ['zrx', '0x', 'svg'],
    ['btm', 'Bytom', 'svg'],
    ['kick', 'KickCoin', 'png'],
    ['veri', 'Veritaseum', 'svg'],
    ['ebtc', 'eBitcoin', 'png'],
    ['fun', 'FunFair', 'svg'],
    ['rep', 'Augur', 'svg'],
    ['salt', 'SALT', 'svg'],
    ['gnt', 'Golem', 'svg'],
    ['wtc', 'Walton', 'svg'],
    ['knc', 'Kyber Network', 'svg'],
    ['pay', 'TenX', 'svg'],
];

export default class Markets extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: null,
            searchTerm: '',
            markets: this.initMarkets()
        };

        let urlMarket = this.state.markets.find(market => market.symbol === props.urlMarketSym);
        this.changeMarket(urlMarket)


        this.searchUpdated = this.searchUpdated.bind(this);
        this.changeMarket = this.changeMarket.bind(this)

    }

    initMarkets(){
        let markets = this.initMarketsInfo();
        return this.generateMarketsData(markets);
    }

    initMarketsInfo(){
        let markets = [];
        for (let i = 0; i < marketsInfo.length; i++) {
            let coin = marketsInfo[i];
            let symbol = coin[0];
            let name = coin[1];
            let iconFormat = coin[2];

            let logoUrl = require('../images/coins/'+ symbol + '.' + iconFormat);

            markets.push({'symbol': symbol, 'name': name, 'logoUrl': logoUrl})
        }
        return markets
    }

    generateMarketsData(markets){
        for (let i = 0; i < markets.length; i++) {
            markets[i]['price'] = (Math.random() * GexHelpers.getRandomInt(1, 3)).toFixed(4);
            markets[i]['volume'] = (Math.random() * GexHelpers.getRandomInt(1000, 5000)).toFixed(4);
            markets[i]['change'] = (GexHelpers.getRandomArbitrary(-100, 100)).toFixed(4);
        }
        return markets;
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
    }

    componentDidMount() {
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    markets: this.generateMarketsData(this.state.markets)
                });
            }, 4000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    changeMarket(market) {
        this.currentMarket = market;
        this.props.marketChanged(market);
    }

    render() {

        const filteredMarkets = this.state.markets.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        let markets = filteredMarkets.map((item, i) =>
            <Market key={i.toString()} market={item} currentMarket={this.currentMarket} changeMarket={this.changeMarket}/>
        )

        return (
            <div className="gx-card padd-md marg-30 no-marg-left">
                <div className="fl-cont  fl-center-vert padd-10 marg-bott-md">

                    <div className="fl-wrap fl-grow">
                        <h3 className="bold no-marg">Markets</h3>
                    </div>


                    <div className="fl-wrap ">
                        <div className="fl-cont fl-center-h search-wrap">
                            <div className="fl-wrap fl-grow">
                                <SearchInput className="gx-search-input" onChange={this.searchUpdated}/>
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


