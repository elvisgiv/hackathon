import React from 'react'

import { Row, Col, } from 'reactstrap';
import FromEth from './fromEth';
import FromSkale from './fromSkale';
import AccountInfo from './accountInfo';



const gex = require('@galacticexchange/gex-client-js');
//const gex = require('@galacticexchange/gex-client-js/src/index');

export default class BotExchange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        //
    }

    componentWillReceiveProps(){
        this.setState({web3Connector: this.props.web3Connector})
    }


    ///////////////////////////
    render(){

        // for template render
        let exchangeEth = <FromEth web3Connector={this.state.web3Connector}/>;
        let exchangeSkale = <FromSkale web3Connector={this.state.web3Connector}/>;
        let accountInfo = <AccountInfo web3Connector={this.state.web3Connector}/>;

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Exchange</h1>
                    <br/>
                    <Row>
                        <Col sd={4}>
                            {exchangeEth}
                        </Col>

                        <Col sd={4}>
                            {exchangeSkale}
                        </Col>
                        <Col sd={4}>
                            {accountInfo}
                        </Col>
                    </Row>
                </Col>
            </Row>



        )

    }

}
