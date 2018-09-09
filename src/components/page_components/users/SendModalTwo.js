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

  async update() {
    let phone = this.state.phone;
    //
    let item = this.getFromLocalStorage()
    //
    this.props.ToggleSend();
    this.props.showSnackbar('updated');


    //
    // this.setToLocalStorage(item);
  }

  getFromLocalStorage() {
    console.log(this.props.username)
    let key = this.props.username
    let item = JSON.parse(localStorage.getItem(key))
    console.log('inside MODAL')
    this.setToLocalStorage(item)
  }


  setToLocalStorage(obj) {
    let item = obj
    item.phone = this.state.phone
    console.log(item.phone)
    // set to browser local storage
    localStorage.setItem(item.name,JSON.stringify(obj));
  }

  render() {
    return (
      <div className="padd-30">
        <CardTitle icon="call_made" text="Update"/>

        <div className="padd-top-30 padd-bott-10">
          <SectionText
            text="phone"
            nopadd={true}
          />
        </div>

        <div className='new-input fl-cont fl-center-h'>
          <div className='fl-col fl-grow'>
            <Input className='flat-input' type="number" placeholder="
                        Enter Phone Number"
                   onChange={(num) =>
                     this.setState({phone: num.target.value})}
                   value={this.state.phone}/>
          </div>
        </div>

        <div className="padd-top-md">
          <div className="padd-top-10">
            <Button unelevated className="green-btn"
                    onClick={() => {
                      this.update();
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
