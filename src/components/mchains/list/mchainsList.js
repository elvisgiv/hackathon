import React from 'react'
import { Button, Table, Row, Col, } from 'reactstrap';

const gex = require('@galacticexchange/gex-client-js');
const moment = require('moment');

//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            timerEvents: null,
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');

        //
        this.isExpired = this.isExpired.bind(this);
        this.countdown = this.countdown.bind(this);
    }

    async getMchainsList(){
        //
        let channelsInfo = await gex.manager().getMchainListInfo();
        console.log(channelsInfo.length);
        //
        this.setState({channelsInfo: channelsInfo});
        //
        console.log(channelsInfo);
        //
        let events = this.getEvents();
        //
        let mChains = this.initMchains();
        //
        this.setState({mChains: mChains});

    }

    hexToString(hexx) {
        let hex = hexx.toString();//force conversion
        return gex.w3.web3.utils.hexToUtf8(hex)
    }

    getEvents() {
        let self = this;
        //
        let events = [];
        //
        let listener = new gex.listener(gex.manager().events.MchainCreated(gex.w3.allEventsOpt()), function (event) {
            //
            events.push(event.returnValues,);
            //events.push({'mChainName': name, 'mChainID': event.returnValues.mchainID});
            self.setState({events: events});
        });
    }

    initMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let mChains = [];
        let events = this.state.events;
        console.log('eventseventseventseventseventsevents')
        console.log(events);
        //
        for (var i = 0; i < states.length; i++) {
            let mChain = states[i];
            //
            let owner = mChain.owner;
            let mChainID = mChain.mChainID;
            let mChainName = '0x706c6561736520776169742e2e'; //please wait...
            let mChainStorage = mChain.storageBytes;
            let mChainLifetime = mChain.lifetime;
            let mChainCreatedAtInSec = mChain.creationDate;
            let mChainNodeNumber = mChain.maxNodes;
            let mChainDeposit = mChain.deposit;
            //
            let date = new Date(this.timeInUtc(mChain.creationDate)).toString();
            //
            let dateTo = parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetime);
            let lifetime = new Date(this.timeInUtc(dateTo)).toString();
            // get mChain name from events by mChainID
            if (events) {
                for (var j = 0; j < events.length; j++) {
                    let event = events[j];
                    if (event.mchainID === mChainID) {
                        mChainName = event.name;
                        break;
                    }
                }
            }

            //
            mChains.push({
                'owner': owner, 'mChainName': self.hexToString(mChainName), 'mChainStorage': mChainStorage, 'mChainDeposit': mChainDeposit,
                'mChainLifetime': lifetime, 'mChainCreatedAt': date, 'mChainNodeNumber': mChainNodeNumber,
                'mChainCreatedAtInSec': mChainCreatedAtInSec, 'mChainLifetimeInSec': mChainLifetime,
            });

            // need for countdown
            self.setState({mChainLifetime: mChainLifetime, mChainCreatedAtInSec: mChainCreatedAtInSec,});

        }
        console.log(mChains);
        return mChains
    }

    componentDidMount() {
        this.getEvents();
        this.getMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getMchainsList()
            }, 15000),
            timerEvents: setInterval(() => {
                this.getEvents()
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
                <Button className="btn btn-sm" onClick={() => this.withdrowFrom(index)} disabled={(countDownDate > timeNow)}>withdrow deposit</Button>
            </div>
        )
    }

    timeInUtc(seconds) {
        //
        let timeFormat = moment.unix(seconds).utc().format();
        //console.log(timeFormat);
        return timeFormat;
    }

    withdrowFrom(index) {
        gex.manager().withdrawFromMchain(index);
        console.log(index)
    }

    countdown(mChainCreatedAtInSec, mChainLifetime) {

        // set countDownDate in ms
        let countDownDate = (parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetime)) * 1000;
        // Update the count down every 1 second
        let x = setInterval(function () {
            // Get todays date and time in ms
            let now = new Date().getTime();
            // Find the distance between now an the count down date
            let distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (!document.getElementById(mChainCreatedAtInSec)) {
                clearInterval(x);
            } else {
                // Display the result in the element with id=mChainCreatedAtInSec
                document.getElementById(mChainCreatedAtInSec).innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ";
                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById(mChainCreatedAtInSec).innerHTML = "EXPIRED";
                }
            }
        }, 1000);
    };


    /////////////////////////////

    render(){

        let items = this.state.mChains;
        let mChains = [];

        if (items !== undefined) {
            mChains = items.map((item, index) =>
                <tr key={index}>
                    <td>{item.mChainName}</td>
                    <td>{item.mChainCreatedAt}</td>
                    <td>{item.mChainLifetime}</td>
                    <td id={item.mChainCreatedAtInSec}>
                        {this.countdown(item.mChainCreatedAtInSec, item.mChainLifetimeInSec)}
                    </td>
                    <td>{item.mChainStorage}</td>
                    <td>{item.mChainNodeNumber}</td>
                    <td>{item.mChainDeposit}</td>
                    <td>
                        {this.isExpired(item.mChainCreatedAtInSec, item.mChainLifetimeInSec, index)}
                    </td>

                </tr>
            )
        }

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Mchains List</h1>
                    <br/>

                    <Table striped>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Expired</th>
                            <th>Storage</th>
                            <th>NodeNumber</th>
                            <th>Deposit</th>
                            <th>Commands</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mChains}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }

}
