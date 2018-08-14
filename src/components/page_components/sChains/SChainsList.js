import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip} from 'reactstrap';

import {Button, ButtonIcon} from 'rmwc/Button';
import {Snackbar} from 'rmwc/Snackbar';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
// for alerts
import swal from 'sweetalert';

const jsonCustom = require('../../../abi.json');

const gex = require('@skale-labs/skale-api');
const moment = require('moment');

export default class MchainsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            // for tooltip
            tooltipOpenName: false,
            tooltipOpenExpires: false,
            tooltipOpenTpS: false,
            tooltipOpenStorage: false,
            tooltipOpenNodes: false,
            tooltipOpenDeposit: false,
            tooltipOpenCpU: false,
            tooltipOpenCreationDate: false,
            tooltipOpenExpirationDate: false,
            // for pass mchain name to mchain show
            mChainName1: null,

            showFilters: false,
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port, jsonCustom);
        //
        this.isExpired = this.isExpired.bind(this);
        //this.countdown = this.countdown.bind(this);
        this.headerTooltip = this.headerTooltip.bind(this);
        this.toggle = this.toggle.bind(this);
        this.linkTo = this.linkTo.bind(this);
        this._onClick = this._onClick.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);

    }


    async getMchainsList() {
        let channelsInfo = await gex.contract('manager').getSchainListInfo();
        //
        console.log(channelsInfo);

        this.setState({channelsInfo: channelsInfo});
        //
        this.initMchains();
    }

    initMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let mChains = [];
        //
        for (let i = 0; i < states.length; i++) {
            let mChain = states[i];
            //
            let owner = mChain.owner;
            let mChainName = mChain.name;
            let mChainStorage = mChain.storageBytes;
            let mChainLifetime = mChain.lifetime;
            let mChainCreatedAtInSec = mChain.creationDate;
            let mChainNodeNumber = mChain.maxNodes;
            let mChainDeposit = mChain.deposit;
            let mChainCpu = mChain.cpu;
            let mChainTps = mChain.transactionThroughput;
            //
            let date = moment.utc(mChainCreatedAtInSec * 1000).format("YYYY/MM/DD HH:mm:ss");
            //
            let dateTo = moment.utc((parseInt(mChainCreatedAtInSec) +
                parseInt(mChainLifetime)) * 1000).format("YYYY/MM/DD HH:mm:ss");
            // countdown run
            let countdown = MchainsList.countdown(mChainCreatedAtInSec, mChainLifetime);
            //
            mChains.push({
                'owner': owner, 'mChainName': mChainName, 'mChainStorage': mChainStorage,
                'mChainLifetime': dateTo, 'mChainCreatedAt': date, 'mChainNodeNumber': mChainNodeNumber,
                'mChainCreatedAtInSec': mChainCreatedAtInSec, 'mChainLifetimeInSec': mChainLifetime,
                'mChainDeposit': mChainDeposit, 'countdown': countdown,
                'mChainCpu': mChainCpu ? mChainCpu : 'in developing',
                'mChainTps': mChainTps ? mChainTps : 'in developing',
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
            }, 5000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    getFieldsFromMchain(value) {
        let mChainCreatedAtInSec, mChainLifetimeInSec;
        let items = this.state.mChains;
        for (let i = 0; i < items.length; i++) {
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
        return (
            <div style={{textAlign: "right"}}>
                <Button dense onClick={() => this.withdrawFrom(value)} disabled={(countDownDate > timeNow)}>
                    Withdraw
                    <ButtonIcon use="keyboard_arrow_right" className="marg-left-sm marg-ri-sm"/>
                </Button>
            </div>
        )
    }

    withdrawFrom(name) {
        swal("Are you sure you want withdraw deposit and destroy '" + name + "' Schain?", {
            icon: "warning",
            buttons: {
                cancel: "No",
                catch: {
                    text: 'Yes',
                    value: 'ddd'
                }
            }
        })
            .then((value) => {
                switch (value) {
                    case 'ddd':
                        swal("After a while, the funds withdrawn from the '" + name + "' Schain deposit " +
                            "will go to your wallet.", {
                            icon: "success"
                        });
                        gex.contract('manager').withdrawFromSchain(name);
                        break;
                    default:
                        swal("Withdraw from '" + name + "' mchain are rejected.");
                }
            })
    }

    static countdown(mChainCreatedAtInSec, mChainLifetime) {
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

    // for tooltip
    toggle(value) {
        let name = value.name;
        let keyKey;
        //
        let tableHeaders = ['Name', 'Creation Date', 'Expiration Date', 'Expires', 'Storage', 'Nodes', 'Deposit', 'CpU', 'TpS'];
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
                <Tooltip placement="right" isOpen={this.state['tooltipOpen' + nameForState]}
                         target={nameForState} toggle={() => this.toggle({name})}>
                    {fullName}
                </Tooltip>
            </div>
        );
    }

    _onClick(name) {

    }

    linkTo(name) {
        return (
            <div style={{fontWeight: 600, fontSize: "12pt"}} className="padd-ri-md">
                <Link to={`/mchains/${name}`}>
                    {name}
                </Link>
            </div>
        )
    }

    toggleFilters() {
        this.setState({showFilters: !this.state.showFilters});
    }


    /////////////////////////////

    render() {

        const items = this.state.mChains;
        // for react-table
        const columns = [
            {
                Header: () => this.headerTooltip('Name', "Unique Schain Name"),
                accessor: "mChainName",
                filterable: true,
                //width: 140,
                Cell: ({value}) => this.linkTo(value)

            },
            {
                Header: () => this.headerTooltip('Storage', "Storage in bytes"),
                accessor: "mChainStorage",
            },
            {
                Header: () => this.headerTooltip('Nodes', "Max number of nodes in this Schain"),
                accessor: "mChainNodeNumber",
            },

            {
                Header: () => this.headerTooltip('CpU', "Central Processing Unit time in % or units"),
                accessor: "mChainCpu",
                //width: 100

            },
            {
                Header: () => this.headerTooltip('TpS', "Transaction Per Second"),
                accessor: "mChainTps",
                //width: 100

            },
            {
                Header: () => this.headerTooltip('Creation Date', "Creation Date"),
                accessor: "mChainCreatedAt",
                //width: 160
            },
            {
                Header: () => this.headerTooltip('Expiration Date', "Expiration Date"),
                accessor: "mChainLifetime",
                //width: 160
            },
            {
                Header: () => this.headerTooltip('Deposit', "Deposit in SkaleTokens (SKL)"),
                accessor: "mChainDeposit",
            },
            /*{
              Header: () => this.headerTooltip('Expires', "Expires after"),
              accessor: 'countdown',
            },*/
            {
                Header: "",
                // add custom value to "Commands" column
                id: 'button',
                accessor: 'mChainName', //value
                //width: 120,
                sortable: false,
                Cell: ({value}) => this.isExpired(value)
            },
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
                        {id: "mChainCreatedAt", desc: true},
                    ]}
                />
                <Snackbar
                    show={this.state.snackbarIsOpen}
                    onHide={evt => this.setState({snackbarIsOpen: false})}
                    message="Create sChain transaction sent"
                    actionText="Hide"
                    actionHandler={() => this.setState({snackbarIsOpen: false})}
                />
            </div>
        )
    }

}
