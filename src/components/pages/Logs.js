import React from 'react'

import PageTitle from "../shared_components/PageTitle";

import LogsList from '../page_components/logs/LogsList'


export default class Logs extends React.Component {
  render() {
    return (
      <div className="marg-30">
        <PageTitle
          title="Logs"
          // subtitle="Here you can review all past events for this account."
          nopadd={true}
        />
        {/*<div className="skale-card marg-bott-30 padd-30 marg-top-30">*/}
          {/*In progress*/}
        {/*</div>*/}


        <div className="skale-card marg-bott-30">
          <LogsList ref="LogsList"/>
        </div>
      </div>
    );
  }
}
