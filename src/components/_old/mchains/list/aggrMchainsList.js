import React from 'react'
import { Button, Table, Row, Col, Collapse, CardBody, Card,} from 'reactstrap';


const gex = require('@skale-labs/skale-api');
const moment = require('moment');

import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const columns=[
        {
            Header: "ID",
            accessor: "aggrMchainID",
            maxWidth: 30
        },
        {
            Header: "Name",
            accessor: "aggrMchainName",
            maxWidth: 150
        },
        {
            Header: "Date From",
            accessor: "aggrMchainCreatedAt",
            maxWidth: 150
        },
        {
            Header: "Date To",
            accessor: "aggrMchainLifetime",
            maxWidth: 150
        },
        {
            Header: "Expired",
            accessor: "countdown",
            maxWidth: 150
        },
        {
            Header: "Storage",
            accessor: "aggrMchainStorage",
        },
        {
            Header: "NodeNumber",
            accessor: "aggrMchainNodeNumber",
        },
        {
            Header: "Deposit",
            accessor: "aggrMchainDeposit",
        },
        {
            Header: "Commands",
            id: 'button',
        },
    ];

const columnsColumns=[
        {
            Header: "ID",
            accessor: "mChainID",
            maxWidth: 30
        },
        {
            Header: "Name",
            accessor: "mChainName",
            maxWidth: 150
        },
        {
            Header: "Date From",
            accessor: "creationDate",
            maxWidth: 150
        },
        {
            Header: "Date To",
            accessor: "lifetime",
            maxWidth: 150
        },
        {
            Header: "Expired",
            accessor: "countdown",
            maxWidth: 150
        },
        {
            Header: "Storage",
            accessor: "storageBytes",
        },
        {
            Header: "NodeNumber",
            accessor: "maxNodes",
        },
        {
            Header: "Deposit",
            accessor: "deposit",
        },
        {
            Header: "Commands",
            accessor: "deposit",
        },
    ];


//const gex = require('@skale-labs/skale-api/src/index');

export default class AggrMchainsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            timerEvents: null,
            collapse: false,

        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');
        //
        this.isExpired = this.isExpired.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    hexToString(hexx) {
        let hex = hexx.toString();//force conversion
        return gex.w3.web3.utils.hexToUtf8(hex)
    }

    async getAggrMchainsList(){
        //
        let channelsInfo = await gex.contract('manager').getAggregationMchainListInfo();
        //
        this.setState({channelsInfo: channelsInfo});
        //
/*        console.log('aggrChannelsInfo');
        console.log(channelsInfo);*/
        //
        this.initAggrMchains();
    }

    async initAggrMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let aggrMchains = [];
        //
        for (var i = 0; i < states.length; i++) {
            let mChain = states[i];
            //
            let owner = mChain.owner;
            let aggrMchainID = mChain.mChainID;

            let aggrMchainName = mChain.name;
            let aggrMchainStorage = mChain.storageBytes;
            let aggrMchainLifetime = mChain.lifetime;
            let aggrMchainCreatedAtInSec = mChain.creationDate;
            let aggrMchainNodeNumber = mChain.maxNodes;
            let aggrMchainDeposit = mChain.deposit;
            // get mchains for aggregation mchains
            let mChains = await this.mChainForAggregation(aggrMchainID);
            //
            let date = moment.utc(aggrMchainCreatedAtInSec * 1000).format("YYYY/MM/DD HH:mm:ss");
            //
            let dateTo = moment.utc((parseInt(aggrMchainCreatedAtInSec) +
                parseInt(aggrMchainLifetime)) * 1000).format("YYYY/MM/DD HH:mm:ss");
            // countdown run
            let countdown = self.countdown(aggrMchainCreatedAtInSec, aggrMchainLifetime);
            //
            aggrMchains.push({
                'owner': owner, 'aggrMchainName': self.hexToString(aggrMchainName), 'aggrMchainStorage': aggrMchainStorage,
                'aggrMchainDeposit': aggrMchainDeposit, 'aggrMchainLifetime': dateTo, 'aggrMchainCreatedAt': date,
                'aggrMchainNodeNumber': aggrMchainNodeNumber, 'aggrMchainCreatedAtInSec': aggrMchainCreatedAtInSec,
                'aggrMchainLifetimeInSec': aggrMchainLifetime, 'aggrMchainID': aggrMchainID,
                'countdown': countdown, 'mChains': mChains,
            });
            // for countdown
            self.setState({createdAtInSec: aggrMchainCreatedAtInSec,
                lifetimeInSec: aggrMchainLifetime})


        }
/*        console.log('aggrMchains');
        console.log(aggrMchains);*/
        // return aggrMchains
        this.setState({aggrMchains: aggrMchains});
    }

    componentDidMount() {
        this.getAggrMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getAggrMchainsList()
            }, 15000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.timerEvents);
    }

    isExpired(mChainCreatedAtInSec, mChainLifetime, index) {
        let timeNow = Math.round(new Date().getTime() / 1000);
        let countDownDate = parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetime);
        return(
            <div>
                <Button className="btn btn-sm" onClick={() => this.withdrowFrom(index)} disabled={(countDownDate > timeNow)}>withdraw deposit</Button>
                <Button className="btn btn-sm" onClick={() => this.addToAggregation()}>Add mChain</Button>
            </div>
        )
    }

    async mChainForAggregation(id) {
        let mChains = await gex.contract('manager').getMchainListInfoFromAggregationMchain(id);

        let arrOfMchain = this.initMchains(mChains);
/*
        console.log('mChainForAggregationmChainForAggregation');
        console.log(mChains);*/
        return arrOfMchain;
    }

    // for subitems in table
    initMchains(mChains) {
        let objArray = [];
        let self = this;
        //
        for (var i = 0; i < mChains.length; i++) {
            let mChain = mChains[i];
            //
            let owner = mChain.owner;
            let mChainID = mChain.mChainID;
            let mChainName = mChain.name;
            let mChainStorage = mChain.storageBytes;
            let mChainLifetime = mChain.lifetime;
            let mChainCreatedAtInSec = mChain.creationDate;
            let mChainNodeNumber = mChain.maxNodes;
            let mChainDeposit = mChain.deposit;
            //
            let date = moment.utc(mChainCreatedAtInSec * 1000).format("YYYY/MM/DD HH:mm:ss");
            //
            let dateTo = moment.utc((parseInt(mChainCreatedAtInSec) +
                parseInt(mChainLifetime)) * 1000).format("YYYY/MM/DD HH:mm:ss");
            //
            objArray.push({
                'owner': owner, 'mChainName': self.hexToString(mChainName), 'mChainStorage': mChainStorage,
                'mChainLifetime': dateTo, 'mChainCreatedAt': date, 'mChainNodeNumber': mChainNodeNumber,
                'mChainCreatedAtInSec': mChainCreatedAtInSec, 'mChainLifetimeInSec': mChainLifetime,
                'mChainDeposit': mChainDeposit, 'mChainID': mChainID,
            });
        }

        return objArray
    }

    withdrowFrom(index) {
        gex.contract('manager').withdrawFromAggregationMchain(index);
        console.log(index)
    }

    addToAggregation() {
        console.log('DOSHLOOOOOOOO!!!!')
    }

    countdown(mChainCreatedAtInSec, mChainLifetime) {
        let str;
        // set countDownDate in ms
        let countDownDate = (parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetime)) * 1000;
        // Get todays date and time in ms
        let now = new Date().getTime();
        // Find the distance between now an the count down date
        let distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // If the count down is finished, write some text
        if (distance < 0) {
            str = "EXPIRED";
            return str

        } else {
            str = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            return str

        }
    };

    // for mChains list
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    /////////////////////////////

    render(){

        const data = this.state.aggrMchains;

        return (
            <div>
                <h1 className="bold text-center" >Aggregations Mchains List</h1>
                <br/>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return (
                            <div style={{ padding: "20px" }}>
                                <ReactTable
                                    data={row.row._original.mChains}
                                    columns={columnsColumns}
                                    defaultPageSize={3}
                                    showPagination={true}
                                />
                            </div>
                        );
                    }}
                />
                <br />
            </div>
        );
    }
}
