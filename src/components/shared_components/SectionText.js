import React from 'react'
import 'material-components-web/dist/material-components-web.min.css';

import {Icon} from 'rmwc/Icon';
import {Tooltip} from 'reactstrap';

export default class SectionText extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      rand: Math.floor(Math.random() * 30000),
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <div className={"fl-cont fl-center-vert " + (this.props.nopadd ? '' : 'padd-bott-md')}>
        <div className="fl-col">
          <h6 className="gr-text light">{this.props.text}</h6>
        </div>
        {!this.props.tooltipText ? null :
          (<div className="fl-col padd-left-30">
            <Icon id={"Tooltip"+this.state.rand} strategy="ligature" className="info-icon clickable">help</Icon>
            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target={"Tooltip"+this.state.rand} toggle={this.toggle}>
              {this.props.tooltipText}
            </Tooltip>
          </div>)
        }
      </div>
    );
  }
}
