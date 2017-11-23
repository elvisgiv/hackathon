import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Exchange from './exchange';

import PropTypes from 'prop-types';

class App extends Component {

    constructor(props, context) {
        super(props);
        this.state = {web3Context: context.web3};

        const web3Context = context.web3;

        //console.log(props)
        //console.log(context)


    }


    componentDidMount() {
        console.log('leee')
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

        let css = {
            paddingTop: "20px"
        }

    return (
      <div className="App" style={css}>
          <Exchange/>
      </div>
    );
  }
}

App.contextTypes = {
    web3: PropTypes.object
};

export default App;


