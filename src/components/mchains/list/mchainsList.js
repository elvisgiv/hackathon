import React from 'react'
import { Button, Table, Row, Col, } from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const gex = require('@galacticexchange/gex-client-js');
const moment = require('moment');

//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //
        this.isExpired = this.isExpired.bind(this);
        this.countdown = this.countdown.bind(this);
    }

    async getMchainsList(){
        let channelsInfo = await gex.manager().getMchainListInfo();
        //
        this.setState({channelsInfo: channelsInfo});
        //
        this.initMchains();
    }

    hexToString(hexx) {
        let hex = hexx.toString();//force conversion
        return gex.w3.web3.utils.hexToUtf8(hex)
    }

    initMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let mChains = [];
        let events = this.state.events;
        //
        for (var i = 0; i < states.length; i++) {
            let mChain = states[i];
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
            // countdown run
            let countdown = self.countdown(mChainCreatedAtInSec, mChainLifetime);
            //
            mChains.push({
                'owner': owner, 'mChainName': self.hexToString(mChainName), 'mChainStorage': mChainStorage,
                'mChainLifetime': dateTo, 'mChainCreatedAt': date, 'mChainNodeNumber': mChainNodeNumber,
                'mChainCreatedAtInSec': mChainCreatedAtInSec, 'mChainLifetimeInSec': mChainLifetime,
                'mChainDeposit': mChainDeposit, 'mChainID': mChainID, 'countdown': countdown,
            });
        }
        //return mChains;
        this.setState({mChains: mChains});
    }

    componentDidMount() {
        this.getMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getMchainsList()
            }, 15000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    getFieldsFromMchain(value) {
        let mChainCreatedAtInSec, mChainLifetimeInSec;
        let items = this.state.mChains;
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.mChainName === value) {
                mChainCreatedAtInSec = item.mChainCreatedAtInSec;
                mChainLifetimeInSec = item.mChainLifetimeInSec;
                break;
            }
        }
        //
        return [mChainCreatedAtInSec, mChainLifetimeInSec]
    }

    isExpired(value) {
        let array = this.getFieldsFromMchain(value);
        //
        let mChainCreatedAtInSec = array[0];
        let mChainLifetimeInSec = array[1];
        //
        let timeNow = Math.round(new Date().getTime() / 1000);
        let countDownDate = parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetimeInSec);
        //
        return(
            <div>
                <Button className="btn btn-sm" onClick={() => this.withdrowFrom(value)} disabled={(countDownDate > timeNow)}>withdraw deposit</Button>
            </div>
        )
    }

    withdrowFrom(name) {
        gex.manager().withdrawFromMchain(name);
        console.log(name)
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


    /////////////////////////////

    render(){

        const items = this.state.mChains;
        // for react-table
        const columns=[
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
                accessor: "mChainCreatedAt",
                maxWidth: 150
            },
            {
                Header: "Date To",
                accessor: "mChainLifetime",
                maxWidth: 150
            },
            {
                Header: "Expired",
                accessor: 'countdown',
            },
            {
                Header: "Storage",
                accessor: "mChainStorage",
            },
            {
                Header: "NodeNumber",
                accessor: "mChainNodeNumber",
            },
            {
                Header: "Deposit",
                accessor: "mChainDeposit",
            },
            {
                Header: "Commands",
                // add custom value to "Commands" column
                id: 'button',
                accessor: 'mChainName', //value
                Cell: ({value}) => this.isExpired(value)
            },
        ];


        return(
            <div>
                <h1 className="bold text-center" >Mchains List</h1>
                <br/>
                <ReactTable
                    data={items}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        )
    }

}
