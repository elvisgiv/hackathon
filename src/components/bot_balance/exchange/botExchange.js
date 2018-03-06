import React from 'react'

import { Row, Col, } from 'reactstrap';
import FromEth from './fromEth';
import FromSkale from './fromSkale';
//import AccountInfo from './accountInfo';
import ReturnEth from "./returnEth";
import ReturnSkl from "./returnSkl";


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
        //let accountInfo = <AccountInfo web3Connector={this.state.web3Connector}/>;
        let returnEth = <ReturnEth web3Connector={this.state.web3Connector}/>;
        let returnSkl = <ReturnSkl web3Connector={this.state.web3Connector}/>;

        return(
            <Row>
                <Col sm="12">
                    <h1 className="bold text-center" >Exchange</h1>
                    <br/>
                    <Row>
                        <Col sd={5}>
                            {exchangeEth}
                        </Col>

                        <Col sd={2}></Col>

                        <Col sd={5}>
                            {exchangeSkale}
                        </Col>
                        {/*<Col sd={4}>
                            {accountInfo}
                        </Col>*/}
                    </Row>
                    <h1 className="bold text-center" >Reminder</h1>
                    <h4 className="bold text-center" >(the exchange closes at 00:00 in pacific time)</h4>
                    <br/>
                    <Row>
                        <Col sd={5}>
                            {returnSkl}
                        </Col>

                        <Col sd={2}></Col>

                        <Col sd={5}>
                            {returnEth}
                        </Col>
                    </Row>
                </Col>
            </Row>



        )

    }

}
