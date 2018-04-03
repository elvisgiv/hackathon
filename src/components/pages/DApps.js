import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from "../shared_components/PageTitle";
import CardTitle from "../shared_components/CardTitle";
import CardInfo from "../shared_components/CardInfo";

import {Button, ButtonIcon} from 'rmwc/Button';

import SChainsList from '../page_components/sChains/SChainsList'

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
