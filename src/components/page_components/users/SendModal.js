import React from 'react'

import CardTitle from "../../shared_components/CardTitle";
import SectionText from "../../shared_components/SectionText";

import {Button} from 'rmwc/Button';
import {Input} from 'reactstrap';

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");



export default class SendModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gasFee: 0.008
 
    }
  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      console.log(provider);
      this.setState({libInit: true});
    }
  }

  async addColumn() {
    let fieldName = this.state.fieldName;
    let valueType = this.state.valueType;
    console.log(fieldName);
    console.log(valueType);
    //
    let item = {
      name: fieldName, type: valueType, 
    };
    //
    let res = 'invoke contract method in the future';
    this.props.ToggleSend();
    this.props.showSnackbar('Column added');
    //
    this.setToLocalStorage(item);
  }

  setToLocalStorage(obj) {
    // set to browser local storage
    localStorage.setItem('column_' + obj['name'],JSON.stringify(obj));
  }

  render() {
    return (
      <div className="padd-30">
        <CardTitle icon="call_made" text="Add Column"/>

        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Column Name"
            nopadd={true}
          />
        </div>

        <div className='new-input fl-cont fl-center-h'>
          <div className='fl-col fl-grow'>
            <Input className='flat-input' type="text" placeholder="
                        Enter Column Name"
                   onChange={(num) =>
                     this.setState({fieldName: num.target.value})}
                   value={this.state.fieldName}/>
          </div>
        </div>


        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="Type of value"
            nopadd={true}
          />
        </div>

        <div className='new-input fl-cont fl-center-h'>
          <div className='fl-col fl-grow'>
        
            <Input className='flat-input' type="select" name="select" id="elvis"
              onChange={(num) => this.setState({valueType: num.target.value})}
              value={this.state.valueType}>
                <option value={0}>text</option>
                <option value={1}>number</option>
            </Input>
          </div>
        </div>

        <div className="padd-top-md">
          <div className="padd-top-10">
            <Button unelevated className="green-btn"
                    onClick={() => {
                      this.addColumn();
                    }}
                    disabled={!this.state.libInit}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.props.ToggleSend}>Cancel</Button>
          </div>
        </div>


      </div>
    );
  }
}
