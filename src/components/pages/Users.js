import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from "../shared_components/PageTitle";

import {Button, ButtonIcon} from 'rmwc/Button';

import UsersList from '../page_components/users/UsersList'


// for add column
import {Snackbar} from 'rmwc/Snackbar';
import {Modal, Collapse} from 'reactstrap';
import SendModal from "../page_components/users/SendModal";

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


export default class Users extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    };
    //
    web3
    //
    this.toggleSend = this.toggleSend.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
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
        <div>
          <div className="fl-cont fl-center-vert padd-bott-30">
            <div className="fl-col fl-grow">
              <PageTitle
                title="Users"
                subtitle="Please, choose an Users to view or create a new one."
                nopadd={true}
              />
            </div>

            <div className="fl-col padd-ri-md">
              <Button unelevated className="green-btn" onClick={this.toggleSend}
                      style={{minWidth: "135px"}}>
                  <ButtonIcon use="call_made"/>Add Column</Button>
              <Modal isOpen={this.state.sendModal} toggle={this.toggleSend}>
                  <SendModal showSnackbar={this.showSnackbar} ToggleSend={this.toggleSend}
                            web3Connector={this.props.web3Connector}/>
              </Modal>
            </div>

            <div className="fl-wrap">
              <Link to='/users/create' className="undec">
                <Button className="btn-md" unelevated>Create User</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="skale-card marg-bott-30">
            <UsersList ref="usersList"/>
        </div>
      </div>
    );
  }
}
