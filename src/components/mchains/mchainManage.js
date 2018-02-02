import React from 'react'

import { Button, Input, Row, Col, } from 'reactstrap';
import CreateAggregationMchain from './create/createAggregationMchain'
import CreateMchain from './create/createMchain'
import AddToAggregation from './create/addToAggregation'



const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class MchainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        //
        let ip = '51.0.1.99';
        let port = '8546';
        gex.init(ip, port);
        //gex.init('10.1.0.15', '7545');
        //gex.init('51.0.2.99', '8546');

        //
    }


    ///////////////////////////
    render(){

        // for template render
        let createAggregationMchain = <CreateAggregationMchain/>;
        let createMchain = <CreateMchain/>;
        let addToAggregation = <AddToAggregation/>;

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Mchain Managing</h1>
                    <br/>
                    <Row>
                        <Col sd={4}>
                            {createAggregationMchain}
                        </Col>

                        <Col sd={4}>
                            {createMchain}
                        </Col>
                        <Col sd={4}>
                            {addToAggregation}
                        </Col>
                    </Row>
                </Col>
            </Row>


        )

    }

}
