import React from 'react'
import {Link} from 'react-router-dom'

import {Tooltip} from 'reactstrap';

import {Snackbar} from 'rmwc/Snackbar';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
// for alerts
import swal from 'sweetalert';

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const moment = require('moment');

export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            showFilters: false,
            array: [],
        };
        //
        web3
        this.toggle = this.toggle.bind(this);
        this.linkTo = this.linkTo.bind(this);
        this._onClick = this._onClick.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
    }


    async getUsersList() {
        localStorage.clear();

        // 
        // let channelsInfo = 'contact invoke';
        let channelsInfo = this.getFromLocalStorage();

        //
        console.log(channelsInfo);

        this.setState({channelsInfo: channelsInfo});
        //
        this.initUsers();
        this.initColumns();
    }

    getFromLocalStorage() {
        let arr = [];
        let col = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(key, localStorage.getItem(key));
            if (key != 'loglevel:webpack-dev-server' ) {
                if (key != "column_phone") {
                // if (key != /column_\w+/) {
                    arr.push(JSON.parse(localStorage.getItem(key)));
                } else {
                    col.push(JSON.parse(localStorage.getItem(key)));
                }
            }

        }

        this.setState({usersFromLocalStorage: arr});
        this.setState({columnFromLocalStorage: col});

        console.log(arr);
        console.log('adsfasfadsfasfdasfd');

        console.log(col);

        console.log('!!!!!!!!!!!!!!!!!!!');

    }

    initUsers() {
        let self = this;
        // let states = this.state.channelsInfo;
        let states = this.state.usersFromLocalStorage
        let users = [];
        //
        for (let i = 0; i < states.length; i++) {
            let user = states[i];
            //
            let name = user.name;
            let age = user.age;
            let email = user.email;
            let phone = user.phone;


            //
            users.push({
                'name': name, 'age': age, 'email': email,  'phone': phone, 
            });
        }
        //return users;
        this.setState({users: users});
    }
    
    initColumns() {
        let self = this;
        // let states = this.state.channelsInfo;
        let states = this.state.columnFromLocalStorage
        let items = ['name', 'age', 'email'];
        //
        for (let i = 0; i < states.length; i++) {
            let item = states[i];
            //
            let name = item.name;
            //
            this.setState({array:[...items, name]});

            console.log("inside init columns")

        }

    }
    
    componentDidMount() {
        this.getUsersList();
        this.setState({
            timer: setInterval(() => {
                this.getUsersList()
            }, 5000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    // for tooltip
    toggle(value) {
        let name = value.name;
        let keyKey;
        //
        let tableHeaders = ['Name', 'Creation Date', 'Email', 'Age', 'Phone'];
        for (let i = 0; i < tableHeaders.length; i++) {
            let header = tableHeaders[i];
            //
            if (name === header) {
                keyKey = 'tooltipOpen' + name.replace(/\s+/g, '');
                this.setState({[keyKey]: !this.state[keyKey]});
                break;
            }
        }
    }

    headerTooltip(name, fullName) {
        let nameForState = name.replace(/\s+/g, '');
        return (
            <div>
                <div id={nameForState}>{name}</div>
                <Tooltip placement="right" isOpen={this.state['tooltipOpen' + nameForState]}
                         target={nameForState} toggle={() => this.toggle({name})}>
                    {fullName}
                </Tooltip>
            </div>
        );
    }

    _onClick(name) {

    }

    linkTo(name) {
        return (
            <div style={{fontWeight: 600, fontSize: "12pt"}} className="padd-ri-md">
                <Link to={`/users/${name}`}>
                    {name}
                </Link>
            </div>
        )
    }

    toggleFilters() {
        this.setState({showFilters: !this.state.showFilters});
    }


    /////////////////////////////

    render() {


        const items = this.state.users;
        let names = ['name', 'age', 'email', ];
        // let names = this.state.array;
        // for react-table
        const columns = [
            // {
            //     Header: () => this.headerTooltip('Name', "User Name"),
            //     accessor: "name",
            //     filterable: true,
            //     //width: 140,

            //     Cell: ({value}) => this.linkTo(value)

            // },
            // {
            //     Header: () => this.headerTooltip('Age', "User age"),
            //     accessor: "age",
            // },
            // {
            //     Header: () => this.headerTooltip('Email', "User Email"),
            //     accessor: "email",
            // },

        ];

        //
        for (let i = 0; i < names.length; i++) {
            let item = names[i];
            //
            columns.push(           
                {
                    Header: item,
                    accessor: item,
                    Cell: ({value}) => this.linkTo(value)
                },);
        }


        return (
            <div className={this.state.showFilters ? '' : 'hideFilters'}>
                <ReactTable
                    data={items}
                    columns={columns}
                    defaultPageSize={10}
                    showPagination={true}
                    className="-striped -highlight"
                    defaultSorted={[
                        {id: "name", desc: true},
                    ]}
                />
                <Snackbar
                    show={this.state.snackbarIsOpen}
                    onHide={evt => this.setState({snackbarIsOpen: false})}
                    message="Create User transaction sent"
                    actionText="Hide"
                    actionHandler={() => this.setState({snackbarIsOpen: false})}
                />
            </div>
        )
    }

}
