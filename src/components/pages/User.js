import React from 'react'

import PageTitle from "../shared_components/PageTitle";

import {Button, ButtonIcon} from 'rmwc/Button';

import {Snackbar} from 'rmwc/Snackbar';
import {Modal, Collapse} from 'reactstrap';
import SendModal from "../page_components/users/SendModalTwo";

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export default class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    }
    //
    web3
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
    //
    this.toggleSend = this.toggleSend.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
    
  }

  componentDidMount() {
    this.getUserInfo();
    this.setState({
        timer: setInterval(() => {
            this.getUserInfo()
        }, 3000),
    });
  }

  componentWillMount() {
    this.getUserInfo()
  }

  getUserInfo() {

    this.getFromLocalStorage()

    // this.initUsers();

  }

  getFromLocalStorage() {
    let key = this.props.props.match.params.name
    let item = JSON.parse(localStorage.getItem(key))
    console.log('inside getFromLocalStorage')
    this.setState({user: item});
  }

  toggleSend() {
    this.setState({
        sendModal: !this.state.sendModal
    });
  }

  showSnackbar(message) {
      this.setState({
          snackbarIsOpen: !this.state.snackbarIsOpen,
          snackbarMessage: message
      })
  }

  render() {

    return (
      <div className="marg-30">
          <PageTitle
            title="User"
            subtitle="Here you can review your data."
            nopadd={true}
          />
          <div className="skale-card marg-bott-30 padd-30 marg-top-30">
              <h5>name: {this.state.user.name}</h5>
              <br></br>
              <h5>age: {this.state.user.age}</h5>
              <br></br>
              <h5>email: {this.state.user.email}</h5>
              <br></br>
              <h5>phone: {this.state.user.phone}</h5>
              <br></br>
          </div>

          <div className="fl-col padd-ri-md">
          <Button unelevated className="green-btn" onClick={this.toggleSend}
                  style={{minWidth: "135px"}}>
              <ButtonIcon use="call_made"/>Update</Button>
          <Modal isOpen={this.state.sendModal} toggle={this.toggleSend}>
              <SendModal showSnackbar={this.showSnackbar} ToggleSend={this.toggleSend}
                        web3Connector={this.props.web3Connector}
                        username={this.props.props.match.params.name}/>
          </Modal>
        </div>
      </div>
    );
  }
}
