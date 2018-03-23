import React from 'react'
import {Link} from 'react-router-dom'

import {Container, Row, Col} from 'reactstrap';
import {Button} from 'rmwc/Button';
import {Fab} from 'rmwc/Fab';
import {Elevation} from 'rmwc/Elevation';

import SChainsList from '../mchains/list/mchainsList'


export default class sChains extends React.Component {


  render() {
    return (
      <div className="marg-30">
        <Container>
          <div className="fl-cont fl-center-vert padd-bott-30">
            <div className="fl-wrap fl-grow">
            </div>
            <div className="fl-wrap padd-ri-md">
              <Link to='/schains/create' className="undec">
                <Button raised>Create sChain</Button>
              </Link>
            </div>

            <div className="fl-wrap">
              <Fab mini className="gr-fab" onClick={() => this.refs.sChainsList.toggleFilters()}>filter_list</Fab>
            </div>
          </div>
        </Container>


        <Container className="mdc-elevation--z4 padd-top-10">
            <SChainsList ref="sChainsList"/>
        </Container>


      </div>
    );
  }
}
