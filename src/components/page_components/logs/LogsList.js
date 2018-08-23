import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip} from 'reactstrap';

// import the react-json-view component
import ReactJson from 'react-json-view'

import {Button, ButtonIcon} from 'rmwc/Button';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {initLogs} from './LogsReader';

const jsonCustom = require('../../../abi.json');
const gex = require('@skale-labs/skale-api');
const moment = require('moment');

const Web3 = require('web3');


export default class LogsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            mChainName1: null,

            showFilters: false,
        };
        //
        let ip = '13.59.228.21';
        let port = '8546';
        gex.init(ip, port, jsonCustom);
        //
        this.headerTooltip = this.headerTooltip.bind(this);
        this.toggle = this.toggle.bind(this);
        this._onClick = this._onClick.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.filterCaseInsensitive = this.filterCaseInsensitive.bind(this);


    }

    async getLogsList() {
        let channelsInfo = await gex.contract('manager').getSchainListInfo();
        //
        this.setState({channelsInfo: channelsInfo});
        //
        this.initLogsListener();
    }

    async initLogsListener() {

        let from = await initLogs();

        let logs = [];

        for (let i = 0; i < from.length; i++) {
            let arrLogs = from[i];

            for (let t = 0; t < arrLogs.length; t++) {
                let log = arrLogs[t];
                //
                let retValue = log.returnValues;
                let logName = log.event;
                let logDate = moment.utc(retValue.time * 1000).format("YYYY/MM/DD HH:mm:ss");
                let logLevel = 'INFO';

                logs.push({
                        'logName': logName, 'logLevel': logLevel, 'logDate': logDate, 'logMessage': retValue, //JSON.stringify(retValue),
                    }
                )
            }
        }
        //
        this.setState({logs: logs});
        // console.log(new Web3(window.web3.currentProvider))
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



    filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                :
                true
        );
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
/*            {
                Header: () => this.headerTooltip('Level', "Log level"),
                width: 100,
                accessor: "logLevel",
                // filterable: true,
            },*/
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
                    defaultPageSize={10}
                    filterable
                    freezeWhenExpanded={true}
                    defaultFilterMethod={this.filterCaseInsensitive}
                    showPagination={true}
                    pagination={{ position: 'both' }}
                    className="-striped -highlight"
                    defaultSorted={[
                        {id: "logDate", desc: true},
                    ]}
                    SubComponent={row => {
                        return (
                            <div style={{padding: '10px'}}>

                                {/*{console.log(row.original.logMessage)}*/}
                                <ReactJson src={row.original.logMessage} />


                            </div>
                        );
                    }}

                />
            </div>
        )
    }

}
