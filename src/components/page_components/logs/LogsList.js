import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip} from 'reactstrap';

import {Button, ButtonIcon} from 'rmwc/Button';

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

            showFilters: false,
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port, jsonCustom);
        //
        this.headerTooltip = this.headerTooltip.bind(this);
        this.toggle = this.toggle.bind(this);
        this._onClick = this._onClick.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);

    }

    async getLogsList() {
        let channelsInfo = await gex.contract('manager').getSchainListInfo();
        //
        this.setState({channelsInfo: channelsInfo});
        //
        this.initLogsListener();
    }

    async initLogsListener() {
        let accounts = await gex.w3.getAccounts();
        let account = accounts[0];
        let from = [];
        //
        let nodes = await gex.contract('nodes').web3contract.getPastEvents('NodeCreated', {
            filter: {_from: account},
            fromBlock: 0,
            toBlock: 'latest'
        }, function (error, events) {
            if (error) console.error(error);
        });
        //
        let schains = await gex.contract('schains').web3contract.getPastEvents('SchainCreated', {
            filter: {_from: account},
            fromBlock: 0,
            toBlock: 'latest'
        }, function (error, events) {
            if (error) console.error(error);
        });
        from.push(nodes, schains);

        console.log(from);
        console.log('+++++++++EVENT++++++++');


        let logs = [];

        for (let i = 0; i < from.length; i++) {
            let arrLogs = from[i];

            for (let t = 0; t < arrLogs.length; t++) {
                let log = arrLogs[t];
                //
                let retValue = log.returnValues;
                let logName = log.event;
                let logDate = moment.utc(retValue.time * 1000).format("YYYY/MM/DD HH:mm:ss");;
                let logLevel = 'INFO';

                logs.push({
                        'logName': logName, 'logLevel': logLevel, 'logDate': logDate, 'logMessage': JSON.stringify(retValue),
                    }
                )
            }
        }
        //
        this.setState({logs: logs});
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

    _onClick(name) {

    }


    toggleFilters() {
        this.setState({showFilters: !this.state.showFilters});
    }


    /////////////////////////////

    render() {

        const items = this.state.logs;
        // for react-table
        const columns = [
            {
                Header: () => this.headerTooltip('Date', "Date of log creation"),
                width: 250,
                accessor: "logDate",
                filterable: true,
            },
            {
                Header: () => this.headerTooltip('Level', "Log level"),
                width: 100,
                accessor: "logLevel",
                filterable: true,
            },
            {
                Header: () => this.headerTooltip('Log Name', "Log Name"),
                accessor: "logName",
                // filterable: true,
            },
            /*      {
                    Header: () => this.headerTooltip('Message', "Log Message"),
                    accessor: "logMessage",
                    filterable: true,
                  },*/

            {
                Header: () => this.headerTooltip('More', "Full log message"),
                width: 100,
                expander: true,

            }
        ];


        return (
            <div className={this.state.showFilters ? '' : 'hideFilters'}>
                <ReactTable
                    data={items}
                    columns={columns}
                    //defaultPageSize={10}
                    pgination={false}
                    showPagination={false}
                    className="-striped -highlight"
                    defaultSorted={[
                        {id: "logDate", desc: true},
                    ]}
                    filterable
                    SubComponent={row => {
                        return (
                            <div style={{padding: '10px'}}>

                                {console.log(row.original.logMessage)}
                                {row.original.logMessage}


                            </div>
                        );
                    }}

                />
            </div>
        )
    }

}
