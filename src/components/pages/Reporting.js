import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from "../shared_components/pageTitle";
import CardTitle from "../shared_components/cardTitle";
import SectionTitle from "../shared_components/sectionTitle";
import CardInfo from "../shared_components/cardInfo";

import {Button, ButtonIcon} from 'rmwc/Button';

export default class Reporting extends React.Component {
  render() {
    return (
      <div className="marg-30">
        <PageTitle
          title="Reporting"
          subtitle="Dashboard with real-time performance of your sChains."
          nopadd={true}
        />
        <div className="skale-card marg-bott-30 padd-30 marg-top-30">
          In progress
        </div>
      </div>
    );
  }
}
