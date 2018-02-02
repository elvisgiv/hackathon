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
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');

        //
        this.getMchainsList = this.getMchainsList.bind(this);
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
        let mChains = this.initMchains();
        //todo get events for name chain

        let listener = new gex.listener(gex.manager().events.MchainCreated(gex.w3.allEventsOpt()), function (event) {
            console.log('EVENT');
            console.log(event);
            let str = event.returnValues.mchainID;
            console.log('dimondimondimondimondimondimondimondimon');
            console.log(str);
        });
        //

        this.setState({mChains: mChains});

    }

    initMchains() {
        let self = this;
        let states = this.state.channelsInfo;
        let mChains = [];
        //
        for (var i = 0; i < states.length; i++) {
            let mChain = states[i];
            //
            let owner = mChain[0];
            let mChainName = mChain[6];
            let mChainStorage = mChain[1];
            let mChainLifetime = mChain[2];
            let mChainCreatedAtInSec = mChain[3];
            let mChainNodeNumber = mChain[4];
            let mChainDeposit = mChain[5];

            let date = new Date(this.timeInUtc(mChain[3])).toString()

            //
            mChains.push({
                'owner': owner, 'mChainName': mChainName, 'mChainStorage': mChainStorage, 'mChainDeposit': mChainDeposit,
                'mChainLifetime': mChainLifetime, 'mChainCreatedAt': date,
                'mChainNodeNumber': mChainNodeNumber, 'mChainCreatedAtInSec': mChainCreatedAtInSec,
            });

            // need for countdown
            self.setState({mChainLifetime: mChainLifetime, mChainCreatedAtInSec: mChainCreatedAtInSec,});

        }
        console.log(mChains);
        return mChains
    }

    componentDidMount() {
        this.getMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getMchainsList()
            }, 15000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    isExpired(mChainCreatedAtInSec, mChainLifetime, index) {
        let timeNow = Math.round(new Date().getTime() / 1000);
        let countDownDate = parseInt(mChainCreatedAtInSec) + parseInt(mChainLifetime);


        return(
            <div>
                <Button className="btn btn-sm" onClick={() => this.withdrowFrom(index)} disabled={(countDownDate > timeNow)}>pick up a deposit</Button>
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
                    <td>{item.mChainStorage}</td>
                    <td>{item.mChainLifetime}</td>
                    <td>{item.mChainNodeNumber}</td>
                    <td>{item.mChainDeposit}</td>
                    <td id={item.mChainCreatedAtInSec}>
                        {this.countdown(item.mChainCreatedAtInSec, item.mChainLifetime)}
                    </td>
                    <td>
                        {this.isExpired(item.mChainCreatedAtInSec, item.mChainLifetime, index)}
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
                                <th>mChainName</th>
                                <th>mChainCreatedAt</th>
                                <th>mChainStorage</th>
                                <th>mChainLifetime</th>
                                <th>mChainNodeNumber</th>
                                <th>mChainDeposit</th>
                                <th>Expired</th>
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
