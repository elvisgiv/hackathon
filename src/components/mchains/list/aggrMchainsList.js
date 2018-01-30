import React from 'react'
import { Table, Row, Col, } from 'reactstrap';

const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class AggrMchainsList extends React.Component {

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
        this.getAggrMchainsList = this.getAggrMchainsList.bind(this);
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
        let aggrMchains = this.initAggrMchains()
        //
        this.setState({aggrMchains: aggrMchains});
    }

    initAggrMchains() {
        let states = this.state.channelsInfo;
        let aggrMchains = [];
        //
        for (var i = 0; i < states.length; i++) {
            let item = states[i];
            //
            let owner = item[0];
            let aggrMchainName = item[6];
            let aggrMchainStorage = item[1];
            let aggrMchainLifetime = item[2];
            let aggrMchainID = item[3];
            let aggrMchainNodeNumber = item[4];
            let aggrMchainDeposit = item[5];
            //
            aggrMchains.push({
                'owner': owner, 'aggrMchainName': aggrMchainName, 'aggrMchainStorage': aggrMchainStorage,
                'aggrMchainDeposit': aggrMchainDeposit, 'aggrMchainLifetime': aggrMchainLifetime,
                'aggrMchainID': aggrMchainID, 'aggrMchainNodeNumber': aggrMchainNodeNumber,
            })
        }
        console.log(aggrMchains);
        return aggrMchains
    }

    componentDidMount() {
        this.getAggrMchainsList();
        this.setState({
            timer: setInterval(() => {
                this.getAggrMchainsList()
            }, 15000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }



    /////////////////////////////

    render(){

        let items = this.state.aggrMchains;
        let aggrMchains = [];

        if (items !== undefined) {
            aggrMchains = items.map((item, i) =>
                <tr key={i}>
                    <td>{item.aggrMchainName}</td>
                    <td>{item.aggrMchainID}</td>
                    <td>{item.aggrMchainStorage}</td>
                    <td>{item.aggrMchainLifetime}</td>
                    <td>{item.aggrMchainNodeNumber}</td>
                    <td>{item.aggrMchainDeposit}</td>
                </tr>
            )
        }

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Aggregation Mchains List</h1>
                    <br/>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>aggrMchainName</th>
                                <th>aggrMchainID</th>
                                <th>aggrMchainStorage</th>
                                <th>aggrMchainLifetime</th>
                                <th>aggrMchainNodeNumber</th>
                                <th>aggrMchainDeposit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aggrMchains}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }

}
