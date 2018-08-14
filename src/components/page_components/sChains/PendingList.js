import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip} from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const jsonCustom = require('../../../abi.json');

const gex = require('@skale-labs/skale-api');

const moment = require('moment');


export default class LogsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            mChainName1: null,
            arrayOfPending: [],
            schainNames: null,

            showFilters: false,
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port, jsonCustom);
        //
        this.headerTooltip = this.headerTooltip.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);

    }

    async getLogsList() {
        //
        this.getFromLocalStorage();
        //
        this.initLogsListener();
    }

    async initLogsListener() {
        let accounts = await gex.w3.getAccounts();
        let account = accounts[0];
        let from = await gex.contract('schains').web3contract.getPastEvents('SchainCreated', {
            filter: {_from: account},
            fromBlock: 0,
            toBlock: 'latest'
        }, function (error, events) {
            if (error) console.error(error);
        });
        //
        let schainNames = [];
        for (let i = 0; i < from.length; i++) {
            let log = from[i];
            //
            let retValue = log.returnValues;

            let sChainName = retValue.name;

            schainNames.push(sChainName);
        };
        //
        this.setState({schainNames: schainNames});
        // check if event is came
        this.deleteFromLocalStorageIfEventCame();
    }

    deleteFromLocalStorageIfEventCame() {
        let pendings = this.state.arrayOfPending;
        let schainNames = this.state.schainNames;
        console.log(schainNames);
        //
        for (let i = 0; i < pendings.length; i++) {
            let item = pendings[i];
            let schainName = item.name;
            //
            if (schainNames.includes(schainName)) {
                console.log('match found', schainName);
                localStorage.removeItem(schainName);
            } else if (moment.now() > (parseInt(item.dateInMiliSec, 10) + 3600000)) {
                console.log("time's up, baby, time's up");
                localStorage.removeItem(schainName);
            } else {
                console.log('no matches found', schainName);
            }
        }

    };

    componentWillMount() {
        this.getFromLocalStorage();
    }

    componentDidMount() {
        this.getLogsList();
        this.setState({
            timer: setInterval(() => {
                this.getLogsList()
            }, 15000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    getFromLocalStorage() {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(key, localStorage.getItem(key));
            if (key != 'loglevel:webpack-dev-server') {
                arr.push(JSON.parse(localStorage.getItem(key)));
            }
        }

        this.setState({arrayOfPending: arr});

        console.log(arr)
    }

    // for tooltip
    toggle(value) {
        let name = value.name;
        let keyKey;
        //
        let tableHeaders = ['Date', 'Level', 'Name', 'Message'];
        for (let i = 0; i < tableHeaders.length; i++) {
            let header = tableHeaders[i];
            //
            if (name === header) {
                keyKey = 'tooltipOpen' + name.replace(/\s+/g, '');
                this.setState({[keyKey]: !this.state[keyKey]});
                break;
            }
        }
    }

    headerTooltip(name, fullName) {
        let nameForState = name.replace(/\s+/g, '');
        return (
            <div>
                <div id={nameForState}>{name}</div>
                <Tooltip placement="auto" isOpen={this.state['tooltipOpen' + nameForState]}
                         target={nameForState} toggle={() => this.toggle({name})}>
                    {fullName}
                </Tooltip>
            </div>
        );
    }

    toggleFilters() {
        this.setState({showFilters: !this.state.showFilters});
    }


    /////////////////////////////

    render() {

        const items = this.state.arrayOfPending;
        // for react-table
        const columns = [
            {
                Header: () => this.headerTooltip('Date', "Date of log creation"),
                width: 200,
                accessor: "date",
                // filterable: true,
            },
            {
                Header: () => this.headerTooltip('Status', "Schain status"),
                accessor: "status",
                // filterable: true,
            },
            {
                Header: () => this.headerTooltip('Name', "Unique Schain Name"),
                accessor: "name",
                // filterable: true,

            },
            {
                Header: () => this.headerTooltip('Nodes', "Max number of nodes in this Schain"),
                accessor: "typeOfNodes",
            },
            {
                Header: () => this.headerTooltip('Deposit', "Deposit in SkaleTokens (SKL)"),
                accessor: "deposit",
            },
        ];


        return (
            <div className={this.state.showFilters ? '' : 'hideFilters'}>
                <ReactTable
                    data={items}
                    columns={columns}
                    filterable={false}

                    //defaultPageSize={10}
                    pgination={false}
                    showPagination={false}
                    className="-striped -highlight"
                    defaultSorted={[
                        {id: "date", desc: true},
                    ]}
                />
            </div>
        )
    }

}
