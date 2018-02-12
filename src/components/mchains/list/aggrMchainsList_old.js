import React from 'react'
import { Button, Table, Row, Col, Collapse, CardBody, Card,} from 'reactstrap';


const gex = require('@galacticexchange/gex-client-js');
const moment = require('moment');

//const gex = require('@galacticexchange/gex-client-js/src/index');

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
        this.countdown = this.countdown.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    async getAggrMchainsList(){
        //
        let channelsInfo = await gex.manager().getAggregationMchainListInfo();
        console.log(channelsInfo.length);
        //
        this.setState({channelsInfo: channelsInfo});
        //
        console.log(channelsInfo);
        //
        let events = this.getEvents();
        //
        let aggrMchains = this.initAggrMchains();
        //
        this.setState({aggrMchains: aggrMchains});
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
        let listener = new gex.listener(gex.manager().events.AggregationMchainCreated(gex.w3.allEventsOpt()), function (event) {
            //
            events.push(event.returnValues,);
            //events.push({'mChainName': name, 'mChainID': event.returnValues.mchainID});
            self.setState({events: events});
        });
    }

    initAggrMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let aggrMchains = [];
        let events = this.state.events;
        //
        for (var i = 0; i < states.length; i++) {
            let mChain = states[i];
            //
            let owner = mChain.owner;
            let aggrMchainID = mChain.mChainID;
            let aggrMchainName = '0x706c6561736520776169742e2e'; //please wait...
            let aggrMchainStorage = mChain.storageBytes;
            let aggrMchainLifetime = mChain.lifetime;
            let aggrMchainCreatedAtInSec = mChain.creationDate;
            let aggrMchainNodeNumber = mChain.maxNodes;
            let aggrMchainDeposit = mChain.deposit;
            //
            let date = new Date(this.timeInUtc(aggrMchainCreatedAtInSec)).toString();
            //
            let dateTo = parseInt(aggrMchainCreatedAtInSec) + parseInt(aggrMchainLifetime);
            let lifetime = new Date(this.timeInUtc(dateTo)).toString();
            // get mChain name from events by mChainID
            if (events) {
                for (var j = 0; j < events.length; j++) {
                    let event = events[j];
                    if (event.mchainID === aggrMchainID) {
                        aggrMchainName = event.name;
                        break;
                    }
                }
            }
            //
            aggrMchains.push({
                'owner': owner, 'aggrMchainName': self.hexToString(aggrMchainName), 'aggrMchainStorage': aggrMchainStorage,
                'aggrMchainDeposit': aggrMchainDeposit, 'aggrMchainLifetime': lifetime, 'aggrMchainCreatedAt': date,
                'aggrMchainNodeNumber': aggrMchainNodeNumber, 'aggrMchainCreatedAtInSec': aggrMchainCreatedAtInSec,
                'aggrMchainLifetimeInSec': aggrMchainLifetime, 'aggrMchainID': aggrMchainID,
            });
        }
        console.log(aggrMchains);
        return aggrMchains
    }

    componentDidMount() {
        this.getEvents();
        this.getAggrMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getAggrMchainsList()
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
                <Button className="btn btn-sm" onClick={() => this.withdrowFrom(index)} disabled={(countDownDate > timeNow)}>withdraw deposit</Button>
                <Button className="btn btn-sm" onClick={() => this.addToAggregation()}>Add mChain</Button>
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
        gex.manager().withdrawFromAggregationMchain(index);
        console.log(index)
    }

    addToAggregation() {
        console.log('DOSHLOOOOOOOO!!!!')
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

    // for mChains list
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }



    /////////////////////////////

    render(){

        let items = this.state.aggrMchains;
        let mChains = [];

        if (items !== undefined) {
            mChains = items.map((item, index) =>

                <tr onClick={this.toggle} key={index} >

                    <td>{item.aggrMchainID}</td>
                    <td>
                        {item.aggrMchainName}
                    </td>
                    <td>{item.aggrMchainCreatedAt}</td>
                    <td>{item.aggrMchainLifetime}</td>
                    <td id={item.aggrMchainCreatedAtInSec}>
                        {this.countdown(item.aggrMchainCreatedAtInSec, item.aggrMchainLifetimeInSec)}
                    </td>
                    <td>{item.aggrMchainStorage}</td>
                    <td>{item.aggrMchainNodeNumber}</td>
                    <td>{item.aggrMchainDeposit}</td>
                    <td>
                        {this.isExpired(item.aggrMchainCreatedAtInSec, item.aggrMchainLifetimeInSec, index)}
                    </td>

                </tr>

            )
        }

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Aggregations Mchains List</h1>
                    <br/>

                    <Table striped>
                        <thead>
                        <tr>
                            <th>ID</th>
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
