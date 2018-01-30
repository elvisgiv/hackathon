import React from 'react'
import { Table, Row, Col, } from 'reactstrap';

const gex = require('@galacticexchange/gex-client-js');
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
        this.getMchainsList = this.getMchainsList.bind(this);
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
        //
        this.setState({mChains: mChains});
    }

    initMchains() {
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
            let mChainID = mChain[3];
            let mChainNodeNumber = mChain[4];
            let mChainDeposit = mChain[5];
            //
            mChains.push({
                'owner': owner, 'mChainName': mChainName, 'mChainStorage': mChainStorage, 'mChainDeposit': mChainDeposit,
                'mChainLifetime': mChainLifetime, 'mChainID': mChainID, 'mChainNodeNumber': mChainNodeNumber,
            })
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



    /////////////////////////////

    render(){

        let items = this.state.mChains;
        let mChains = [];

        if (items !== undefined) {
            mChains = items.map((item, i) =>
                <tr key={i}>
                    <td>{item.mChainName}</td>
                    <td>{item.mChainStorage}</td>
                    <td>{item.mChainLifetime}</td>
                    <td>{item.mChainNodeNumber}</td>
                    <td>{item.mChainDeposit}</td>
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
                                <th>mChainStorage</th>
                                <th>mChainLifetime</th>
                                <th>mChainNodeNumber</th>
                                <th>mChainDeposit</th>
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
