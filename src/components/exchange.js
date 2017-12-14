import React from 'react'
import 'material-components-web/dist/material-components-web.min.css';

import Chart from './chart'
import Markets from './markets'


export default class Exchange extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            symbol: props.match.params.symbol
        };

        this.marketChanged = this.marketChanged.bind(this)
    }

    componentWillReceiveProps(){
        //this.setState({symbol: this.props.match.params.symbol})
    }


    marketChanged(symbol){
        this.setState({symbol: symbol});
    }


    render() {
        return (
            <div className="exchange">

                <div className="fl-cont">
                    <div className="fl-wrap fl-grow">
                        <div className="marg-30">
                            <div className="fl-cont fl-center-vert">
                                <div className="fl-wrap fl-grow">
                                    <h1 className="bold no-marg uppercase">{this.state.symbol}</h1>
                                    <h6 className="no-marg lite-gr-text uppercase">{this.state.symbol}/ETH</h6>
                                </div>
                                <div className="fl-wrap">

                                    <div className="gx-card padd-10 long-badge fl-cont fl-center-h text-center">
                                        <div className="fl-wrap padd-ri-md bord-ri">
                                            <h6 className="no-marg lite-gr-text">Last price</h6>
                                            <h5 className="no-marg">0.567854</h5>
                                        </div>

                                        <div className="fl-wrap padd-left-md padd-ri-md bord-ri">
                                            <h6 className="no-marg lite-gr-text">24hr Change</h6>
                                            <h5 className="no-marg green-text">+24.4%</h5>
                                        </div>

                                        <div className="fl-wrap padd-left-md">
                                            <h6 className="no-marg lite-gr-text">Volume</h6>
                                            <h5 className="no-marg">4577.5 ETH</h5>
                                        </div>


                                    </div>
                                </div>


                            </div>



                            <div className="marg-top-30">
                                <Chart/>
                            </div>

                        </div>
                    </div>
                    <div className="fl-wrap markets-section">
                        <Markets symbol={this.state.symbol} marketChanged={this.marketChanged}/>
                    </div>

                </div>





                <div className="marg-30">

                    <div className="fl-cont">

                        <div className="fl-wrap fl-grow padd-ri-md">
                            <div className="gx-card padd-md ">

                                <div className="fl-cont padd-10">

                                    <div className="fl-wrap fl-grow">
                                        <h3 className="bold no-marg">Buy <div className="uppercase inl">{this.state.symbol} </div></h3>
                                    </div>

                                    <div className="fl-wrap ">
                                        f
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fl-wrap fl-grow padd-ri-md padd-left-md">
                            <div className="gx-card padd-md ">

                                <div className="fl-cont padd-10">

                                    <div className="fl-wrap fl-grow">
                                        <h3 className="bold no-marg">Sell <div className="uppercase inl">{this.state.symbol} </div></h3>
                                    </div>

                                    <div className="fl-wrap ">
                                        f
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fl-wrap fl-grow padd-left-md">
                            <div className="gx-card padd-md ">

                                <div className="fl-cont padd-10">

                                    <div className="fl-wrap fl-grow">
                                        <h3 className="bold no-marg">Buy <div className="uppercase inl">{this.state.symbol} </div></h3>
                                    </div>

                                    <div className="fl-wrap ">
                                        f
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>




            </div>


        );
    }
}
