import React from 'react'

import CardTitle from "../../shared_components/CardTitle";
import Admonition from "../../shared_components/Admonition";

export default class SendModalReceive extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    return (
      <div className="padd-30">
        <CardTitle icon="call_received" text="Address copying"/>

        <Admonition className='marg-top-30 info-icon'
                    type="info"
                    title="Info"
                    text="Address copied to clipboard."/>
      </div>
    );
  }
}
