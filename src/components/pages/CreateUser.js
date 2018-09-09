import React from 'react'
import {Redirect} from 'react-router'

import {Input, Container, Tooltip} from 'reactstrap';

import {Button} from 'rmwc/Button';

import PageTitle from "../shared_components/PageTitle";
import CardTitle from "../shared_components/CardTitle";
import SectionText from "../shared_components/SectionText";

import swal from 'sweetalert';

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const moment = require('moment');

export default class CreateUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      email: '',
    };
    //
    this.createUser = this.createUser.bind(this);
    this.toggle = this.toggle.bind(this);



  }

  componentWillReceiveProps() {
    if (!this.state.libInit && this.props.web3Connector) {
      let provider = this.props.web3Connector.provider;
      //
      console.log('inside componentWillReceiveProps');
      console.log(provider);
      web3
      // 
      this.setState({libInit: true});
      ///
      this.initUserListener();
    }
  }

  initUserListener() {
    console.log('inside initUserListener');

    let self = this;
    //
    let listener = 'get event code in future'
    this.setState({UserListener: listener})
  }

  async createUser() {
    // from form
    let name = this.state.name;
    let age = this.state.age;
    let email = this.state.email;
    let phone = this.state.phone;


    let user = {
      name: name, age: age, email: email, phone: phone
    };

    this.setToLocalStorage(user);
    
    console.log('inside createUser method');

    this.setState({
      age: "", name: "", email: "", phone: "", snackbarIsOpen: true, usersPage: true
    });

    //
  }

  setToLocalStorage(obj) {
    // set to browser local storage
    localStorage.setItem(obj['name'],JSON.stringify(obj));
  }

  toggle(fieldName) {
    if (this.state[fieldName] !== undefined) {
      let newState = {};
      newState[fieldName] = !this.state[fieldName];
      this.setState(newState);
    }
  }


  render() {
    
    const {usersPage} = this.state;

    if (usersPage) {
      return <Redirect to="/users" push={true}/>
    }

    return (
      <div className="marg-30">

        <PageTitle
          title="Create User"
          subtitle="Create your user with custom parameters."
        />

        <div className="skale-card padd-30 marg-bott-30">

          <CardTitle icon="settings" text="Configuration"/>


          <div className="card-content">


            <div className="padd-top-10 padd-bott-10">
              <SectionText
                text="Fill these fields to create an user."
                
                nopadd={true}
              />

              <SectionText
                text="Then click 'Create User' and MetaMask pop-up will appear.
                    Click 'Submit' to confirm a transaction."
                
              />
            </div>


            <div className="form-wrap" style={{maxWidth: "850px"}}>
              <div className="">
                <div className="">
                  <h6 className="like-old">Name</h6>
                  <div className="fl-col fl-grow">
                    <Input className="new-input" id="name" type="text" placeholder="Enter Name of User"
                           onChange={(num) =>
                             this.setState({name: num.target.value})} value={this.state.name}/>
                    <br/>
                  </div>

                  <h6 className="like-old">Age</h6>
                  <Input className="new-input" id="age" type="number" size="180"
                         placeholder="Enter Age of User"
                         onChange={(num) =>
                          this.setState({age: num.target.value})} value={this.state.age}/>
                  <br/>

                  <h6 className="like-old">Email</h6>
                  <Input className="new-input" id="email" type="text" size="150" 
                         placeholder="Enter Email of User" 
                         onChange={(num) =>
                          this.setState({email: num.target.value})} value={this.state.email}/>
                  <br/>

                  <h6 className="like-old">Phone</h6>
                  <Input className="new-input" id="phone" type="number" size="150" 
                         placeholder="Enter Phone of User" 
                         onChange={(num) =>
                          this.setState({phone: num.target.value})} value={this.state.phone}/>
                  <br/>

 
                  <br></br>
                  <br></br>
                  <Button className="btn-md" unelevated raised onClick={this.createUser} disabled={!this.state.libInit}>
                      Create User
                  </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

}
