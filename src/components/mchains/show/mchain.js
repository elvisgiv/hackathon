import React from 'react'
import MchainsList from '../list/mchainsList';

// Import React Table
import "react-table/react-table.css";
// for chat
import Input from './messenger/input'
import MessageList from './messenger/messageList'
import Button from './messenger/button'
import SideBar from './messenger/sideBar'

const loremIpsum = require('lorem-ipsum');
const Identicon = require('identicon.js');

const skale = require('@skale-labs/skale-api');
const moment = require('moment');

export default class Mchain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libInit: false,
            show: true,
            messageList: [],
            account: '',
            message: '',
            chain: {},
            timer: null,
            timerTwo: null,
        };
        //
        this.addMessage = this.addMessage.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.libInit && this.props.web3Connector){
            let provider = this.props.web3Connector.provider;
            //gex.initWithProvider(provider);
            let ip = '51.0.1.99';
            let port = '8546';
            skale.initBothProviders(ip, port, provider);
            this.setState({libInit: true});
            this.getAccount();
            this.getMchain(this.state.mChainName);
            let messenger = skale.communicator.addMessenger(this.state.mChainName, skale.w3);
            this.setState({messenger: messenger});
        }
    }

    componentDidMount() {
        this.setState({mChainName: this.props.props.match.params.name});
        this.setState({
            timer: setInterval(() => {
                this.getAccount()
            }, 5000),
            timerTwo: setInterval(() => {
                this.getMchain(this.state.mChainName)
            }, 5000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.timerTwo);
    }


    getRandomColor() {
        var varters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += varters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    token() {
        return (parseInt(Math.random() * 10 % 6));
    }

    photo(size) {
        return new Identicon(String(Math.random()) + String(Math.random()), {
            margin: 0,
            size: size || 20,
        }).toString()
    }

    async getAccount() {
        let accounts = await skale.w3.getAccounts();
        let acc = accounts[0];
        this.setState({account: acc});
    }

    random(type) {
        switch (type) {
            case 'message':
                //var type = this.token();
                var status = 'waiting';
                switch (type) {
                    case 0:
                        type = 'photo';
                        status = 'sent';
                        break;
                    case 1:
                        type = 'file';
                        status = 'sent';
                        break;
                    case 2:
                        type = 'system';
                        status = 'received';
                        break;
                    case 3:
                        type = 'location';
                        break;
                    case 4:
                        type = 'spotify';
                        break;
                    default:
                        type = 'text';
                        status = 'read';
                        break;
                }

                return {
                    // position: (this.token() >= 1 ? 'right' : 'left'),
                    position: (this.state.account === this.state.chain.owner ? 'right' : 'left'),
                    forwarded: true,
                    type: type,
                    theme: 'white',
                    view: 'list',
                    title: this.state.account,
                    titleColor: this.getRandomColor(),
                    text: this.state.message,
                    data: {
                        uri: `data:image/png;base64,${this.photo(150)}`,
                        status: {
                            click: false,
                            loading: 0,
                        },
                        width: 300,
                        height: 300,
                        latitude: '37.773972',
                        longitude: '-122.431297',
                    },
                    status: status,
                    date: new Date(),
                    dateString: moment(new Date()).format('HH:mm'),
                    avatar: `data:image/png;base64,${this.photo()}`,
                };
        }
    }

    async addMessage() {
        let messenger = this.state.messenger;
        let isConnected = await messenger.connect();
        if (isConnected) {
            await messenger.sendMessage(this.state.message);
            console.log('connected');
        } else {
            console.log('disconnected');
            //
            let list = this.state.messageList;
            list.push(this.random('message'));
            this.setState({
                messageList: list,
            });
        }
    }

    async getMchain (name) {
        let mChain = await skale.manager().getMchain(name);
        //
        let mChainOwner = mChain.owner;
        let mChainName = mChain.name;
        let mChainStorage = mChain.storageBytes;
        let mChainLifetime = mChain.lifetime;
        let mChainCreatedAtInSec = mChain.creationDate;
        let mChainNodeNumber = mChain.maxNodes;
        let mChainDeposit = mChain.deposit;
        let mChainCpu = mChain.cpu;
        let mChainTps = mChain.transactionThroughput;
        //
        let date = moment.utc(mChainCreatedAtInSec * 1000).format("YYYY/MM/DD HH:mm:ss");
        //
        let dateTo = moment.utc((parseInt(mChainCreatedAtInSec) +
            parseInt(mChainLifetime)) * 1000).format("YYYY/MM/DD HH:mm:ss");
        // countdown run
        let countdown = MchainsList.countdown(mChainCreatedAtInSec, mChainLifetime);
        //
        this.setState({chain: {
                'owner': mChainOwner, 'mChainName': mChainName, 'mChainStorage': mChainStorage,
                'mChainLifetime': dateTo, 'mChainCreatedAt': date, 'mChainNodeNumber': mChainNodeNumber,
                'mChainCreatedAtInSec': mChainCreatedAtInSec, 'mChainLifetimeInSec': mChainLifetime,
                'mChainDeposit': mChainDeposit, 'countdown': countdown,
                'mChainCpu': mChainCpu, 'mChainTps': mChainTps,
            }});
    }

    render() {
        let arr = [];
        for (let i = 0; i < 5; i++)
            arr.push(i);

        let chatSource = arr.map(x => this.random('chat'));

        return (
            <div className='container chat-container'>
                <div
                    className='chat-list'>
                    <SideBar

                        center={
                            <div>
                                <h3>Chain: {this.state.chain.mChainName}</h3>
                                <p>Creation Date: {this.state.chain.mChainCreatedAt}</p>
                                <p>Expiration Date: {this.state.chain.mChainLifetime}</p>
                                <p>Expires: {this.state.chain.countdown}</p>
                                <p>Storage: {this.state.chain.mChainStorage}</p>
                                <p>Nodes: {this.state.chain.mChainNodeNumber}</p>
                                <p>Deposit: {this.state.chain.mChainDeposit}</p>
                                <p>CpU: {this.state.chain.mChainCpu}</p>
                                <p>TpS: {this.state.chain.mChainTps}</p>
                                <p>Owner: {this.state.chain.owner}</p>
                            </div>
                        }

                    />
                </div>
                <div
                    className='right-panel'>
                    <MessageList
                        className='message-list'
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList} />

                    <Input
                        onChange={(val) => this.setState({message: val.target.value})} value={this.state.message}
                        placeholder="Enter your message here"
                        defaultValue=""
                        ref='input'
                        multiline={true}
                        // buttonsFloat='left'
                        onKeyPress={(e) => {
                            if (e.shiftKey && e.charCode === 13) {
                                return true;
                            }
                            if (e.charCode === 13) {
                                this.refs.input.clear();
                                this.addMessage();
                                e.preventDefault();
                                return false;
                            }
                        }}
                        rightButtons={
                            <Button
                                text='Send'
                                onClick={this.addMessage}
                                disabled={this.state.libInit ? false : true}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}