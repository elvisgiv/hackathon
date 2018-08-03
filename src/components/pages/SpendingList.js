import React from 'react'

import PageTitle from "../shared_components/PageTitle";

import PendingList from '../page_components/sChains/PendingList'


export default class Logs extends React.Component {
  render() {
    return (
      <div className="marg-30">
        <PageTitle
          title="Schain pending list"
          nopadd={true}
        />

        <div className="skale-card marg-bott-30">
          <PendingList ref="LogsList"/>
        </div>
      </div>
    );
  }
}
