import React from 'react'
import {Redirect} from 'react-router'

import {Button} from 'rmwc/Button';
import PageTitle from "../../shared_components/PageTitle";
import SectionTitle from "../../shared_components/SectionTitle";
import CardTitle from "../../shared_components/CardTitle";


const gex = require('@skale-labs/skale-api');

export default class UploadDapp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      libInit: false,
    };
    //

  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      //gex.initWithProvider(provider);
      let ip = '51.0.1.99';
      let port = '8546';
      gex.initBothProviders(ip, port, provider);
      this.setState({libInit: true});
      ///
    }
  }


  render() {

    return (
      <div className="marg-30">

        <PageTitle
          title="Upload Your Dapp"
          subtitle="Upload your own Dapp."
        />


        <div className="skale-card padd-30 marg-bott-30">

          <CardTitle icon="settings" text="Configuration"/>


          <div className="card-content">


            <div className="padd-top-10 padd-bott-10">
              <SectionTitle
                text="Here you could upload your Solidity code to the sChain"
                //tooltipText="todo: short explanation for the sChain creation"
                nopadd={true}
              />
            </div>


            <div className="padd-top-md">
              <Button raised disabled={!this.state.libInit}>Upload</Button>
            </div>

          </div>
        </div>




      </div>
    )

  }

}
