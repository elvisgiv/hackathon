import React from 'react'
import MchainsList from '../list/mchainsList';

import {Link} from 'react-router-dom'
//import { Button, Tooltip, } from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
// for alerts
import swal from 'sweetalert';

// for chat
import Input from './messenger/input'
import MessageList from './messenger/messageList'
import Dropdown from './messenger/dropdown'
import Button from './messenger/button'
import ChatList from './messenger/chatList'
import SideBar from './messenger/sideBar'
//import Popup from './messenger/popup'

import FaSearch from 'react-icons/lib/fa/search';
import FaComments from 'react-icons/lib/fa/comments';
import FaClose from 'react-icons/lib/fa/close';
import FaMenu from 'react-icons/lib/md/more-vert';

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
            var provider = this.props.web3Connector.provider;
            //gex.initWithProvider(provider);
            var ip = '51.0.1.99';
            var port = '8546';
            skale.initBothProviders(ip, port, provider);
            this.setState({libInit: true});
            this.getAccount();
            this.getMchain(this.state.mChainName)
        }
    }

    componentDidMount() {
        this.setState({mChainName: this.props.props.match.params.name})
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
                    //title: loremIpsum({ count: 2, units: 'words' }),
                    title: this.state.account,
                    titleColor: this.getRandomColor(),
                    //text: type === 'spotify' ? 'spotify:track:7wGoVu4Dady5GV0Sv4UIsx' : loremIpsum({ count: 1, units: 'sentences' }),
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
/*            case 'chat':
                return {
                    id: String(Math.random()),
                    avatar: `data:image/png;base64,${this.photo()}`,
                    avatarFlexible: true,
                    statusColor: 'lightgreen',
                    alt: loremIpsum({ count: 2, units: 'words' }),
                    title: loremIpsum({ count: 2, units: 'words' }),
                    date: new Date(),
                    subtitle: loremIpsum({ count: 1, units: 'sentences' }),
                    unread: parseInt(Math.random() * 10 % 3),
                    dropdownMenu: (
                        <Dropdown
                            animationPosition="norteast"
                            buttonProps={{
                                type: "transparent",
                                color: "#cecece",
                                icon: {
                                    component: <FaMenu />,
                                    size: 24,
                                }
                            }}
                            items={[
                                'Menu Item1',
                                'Menu Item2',
                                'Menu Item3',
                            ]} />
                    ),
                    dateString: moment(new Date()).format('HH:mm'),
                };*/
        }
    }

    addMessage() {
        let list = this.state.messageList;
        list.push(this.random('message'));
        //list.push(this.state.message);
        this.setState({
            messageList: list,
        });
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
{/*
                <h3>{this.props.props.match.params.name}</h3>
*/}
                <div
                    className='chat-list'>
                    <SideBar
/*                        top={
                            <Popup
                                // show={this.state.show}
                                header='Lorem ipsum dolor sit amet.'
                                headerButtons={[{
                                    type: 'transparent',
                                    color: 'black',
                                    onClick: () => {
                                        this.setState({ show: false })
                                    },
                                    icon: {
                                        component: <FaClose />,
                                        size: 18
                                    }
                                }]}
                                text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!'
                                footerButtons={[{
                                    color: 'white',
                                    backgroundColor: '#ff5e3e',
                                    text: "Vazgeç",
                                }, {
                                    color: 'white',
                                    backgroundColor: 'lightgreen',
                                    text: "Tamam",
                                }]} />
                        }*/
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



/*                            <ChatList
                                dataSource={chatSource} />*/
/*                        bottom={
                            <span>
                                <Button
                                    type='transparent'
                                    color='black'
                                    icon={{
                                        component: <FaComments />,
                                        size: 18
                                    }} />
                                <Button
                                    type='transparent'
                                    color='black'
                                    icon={{
                                        component: <FaSearch />,
                                        size: 18
                                    }} />
                                <Button text="Count"></Button>
                            </span>
                        } */
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