import React, { Component } from 'react';
import './grid.css';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom'

import Exchange from './exchange';
import Test from './test';
import Header from './partials/header'
import Footer from './partials/footer'

import 'material-components-web/dist/material-components-web.min.css';


class App extends Component {

    constructor(props, context) {
        super(props);
        this.state = {web3Context: context.web3};

        const web3Context = context.web3;

        //console.log(props)
        //console.log(context)


    }


    componentDidMount() {
        console.log(this.contextTypes)

        this.App();
        this.interval = setInterval(() => this.App(), 5000);
    }

    App(){

        this.fetchNetwork()
        this.getAccounts()

        console.log(this.state)

    }

    getAccounts() {
        try {
            const { web3 } = window;
            // throws if no account selected
            const accounts = web3.eth.accounts;

            this.setState({
                accounts: accounts
            });

            return accounts;
        } catch (e) {
            return [];
        }
    }


    fetchNetwork() {
        const { web3 } = window;

        web3 && web3.version && web3.version.getNetwork((err, netId) => {
            if (err) {
                this.setState({
                    networkError: err
                });
            } else {
                this.setState({
                    networkError: null,
                    networkId: netId
                })
            }
        });
    }

  render() {

    return (
      <div className="App">
          <Header/>
          <div className="page-content">


              <Switch>
                  <Route exact path='/' component={Exchange}/>
                  <Route exact path='/exchange' component={Exchange}/>
                  <Route path='/test' component={Test} />
              </Switch>
          </div>
          <Footer/>


      </div>
    );
  }
}

App.contextTypes = {
    web3: PropTypes.object
};

export default App;


