import React from 'react'
import {Link} from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'rmwc/Button';

import SChainsList from '../mchains/list/mchainsList'



export default class sChains extends React.Component {

  render() {
    return (
      <div className="marg-30">
        <Container>

          <div className="fl-cont padd-bott-30">
            <div className="fl-wrap fl-grow">
            </div>
            <div className="fl-wrap">
              <Link to='/schains/create' className="undec">
                <Button raised>Create sChain</Button>
              </Link>
            </div>
          </div>

          <SChainsList/>
        </Container>
      </div>
    );
  }
}
