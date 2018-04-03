import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from "../shared_components/PageTitle";

import {Container, Row, Col} from 'reactstrap';
import {Button} from 'rmwc/Button';
import {Fab} from 'rmwc/Fab';
import {Elevation} from 'rmwc/Elevation';

import SChainsList from '../page_components/sChains/SChainsList'


export default class sChains extends React.Component {


  render() {
    return (
      <div className="marg-30">
        <div>
          <div className="fl-cont fl-center-vert padd-bott-30">
            <div className="fl-col fl-grow">
              <PageTitle
                title="sChains"
                subtitle="Please, choose a sChain to view or create a new one."
                nopadd={true}
              />
            </div>
            <div className="fl-wrap">
              <Link to='/schains/create' className="undec">
                <Button className="btn-md" unelevated>Create sChain</Button>
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
