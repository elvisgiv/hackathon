import React from 'react'

import CardTitle from "../../shared_components/CardTitle";
import SectionText from "../../shared_components/SectionText";

export default class ReceiveModal extends React.Component {
  render() {
    return (
      <div className="padd-30">
        <CardTitle icon="call_received" text="Receive SKALE"/>

        <div className="padd-top-30 padd-bott-10">
          {/*<SectionText
            text="Enter the amount of SKALE that you want to send"
            nopadd={true}
          />*/}
        </div>
      </div>
    );
  }
}
