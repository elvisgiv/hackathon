import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from "../shared_components/pageTitle";
import CardTitle from "../shared_components/cardTitle";
import SectionTitle from "../shared_components/sectionTitle";
import CardInfo from "../shared_components/cardInfo";

import {Button, ButtonIcon} from 'rmwc/Button';

import SChainsList from '../mchains/list/mchainsList'

export default class Dapps extends React.Component {
  render() {
    return (
      <div className="marg-30">
        <div>
          <div className="fl-cont fl-center-vert padd-bott-30">
            <div className="fl-col fl-grow">
              <PageTitle
                title="dApps"
                subtitle="Please, choose a sChain to view or create a new one."
                nopadd={true}
              />
            </div>
            <div className="fl-wrap">
              <Link to='/dapps/upload' className="undec">
                <Button className="btn-md" unelevated>Upload dApp</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="skale-card marg-bott-30">
          <SChainsList ref="sChainsList"/>
        </div>
      </div>
    );
  }
}
