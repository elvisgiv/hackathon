import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import AmCharts from "@amcharts/amcharts3-react";
require("amstock3/amcharts/amstock");


// Generate random data
function generateData() {
    var firstDate = new Date();

    var dataProvider = [];

    for (var i = 0; i < 100; ++i) {
        var date = new Date(firstDate.getTime());

        date.setDate(i);

        dataProvider.push({
            date: date,
            value: Math.floor(Math.random() * 100)
        });
    }

    return dataProvider;
}


function generateChartData() {

    var chartData = []

    var firstDate = new Date();
    firstDate.setHours( 0, 0, 0, 0 );
    firstDate.setDate( firstDate.getDate() - 2000 );

    for ( var i = 0; i < 2000; i++ ) {
        var newDate = new Date( firstDate );

        newDate.setDate( newDate.getDate() + i );

        var open = Math.round( Math.random() * ( 30 ) + 100 );
        var close = open + Math.round( Math.random() * ( 15 ) - Math.random() * 10 );

        var low;
        if ( open < close ) {
            low = open - Math.round( Math.random() * 5 );
        } else {
            low = close - Math.round( Math.random() * 5 );
        }

        var high;
        if ( open < close ) {
            high = close + Math.round( Math.random() * 5 );
        } else {
            high = open + Math.round( Math.random() * 5 );
        }

        var volume = Math.round( Math.random() * ( 1000 + i ) ) + 100 + i;


        chartData[ i ] = ( {
            "date": newDate,
            "open": open,
            "close": close,
            "high": high,
            "low": low,
            "volume": volume
        } );
    }

    return chartData
}







export default  class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //dataProvider: generateData(),
            dataProvider: generateChartData(),
            timer: null
        };
    }

    componentDidMount() {
        this.setState({
            // Update the chart dataProvider every 3 seconds
            timer: setInterval(() => {
                this.setState({
                    dataProvider: generateChartData()
                });
            }, 10000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const config = {
            "type": "stock",
            "theme": "light",
            "dataSets": [ {
                "fieldMappings": [ {
                    "fromField": "open",
                    "toField": "open"
                }, {
                    "fromField": "close",
                    "toField": "close"
                }, {
                    "fromField": "high",
                    "toField": "high"
                }, {
                    "fromField": "low",
                    "toField": "low"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                }, {
                    "fromField": "value",
                    "toField": "value"
                } ],
                "color": "#64a910",
                "dataProvider": this.state.dataProvider,
                "categoryField": "date"
            } ],
            "balloon": {
                "horizontalPadding": 13
            },
            "panels": [ {
                "title": "Value",
                "stockGraphs": [ {
                    "id": "g1",
                    "type": "candlestick",
                    "openField": "open",
                    "closeField": "close",
                    "highField": "high",
                    "lowField": "low",
                    "valueField": "close",

                    "lineColor": "#1E9355",
                    "fillColors": "#1E9355",
                    "negativeLineColor": "#a5261c",
                    "negativeFillColors": "#a5261c",

                    "fillAlphas": 1,
                    "balloonText": "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>",
                    "useDataSetColors": false
                } ]
            } ],
            "scrollBarSettings": {
                "graphType": "line",
                "usePeriod": "WW"
            },
            "panelsSettings": {
                "panEventsEnabled": true
            },
            "cursorSettings": {
                "valueBalloonsEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true
            },
            "periodSelector": {
                "position": "bottom",
                "periods": [ {
                    "period": "DD",
                    "count": 10,
                    "label": "10 days"
                }, {
                    "period": "MM",
                    "selected": true,
                    "count": 1,
                    "label": "1 month"
                }, {
                    "period": "YYYY",
                    "count": 1,
                    "label": "1 year"
                }, {
                    "period": "YTD",
                    "label": "YTD"
                }, {
                    "period": "MAX",
                    "label": "MAX"
                } ]
            }
        };

        return (
            <div className="gx-card padd-30">
                <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
            </div>
        );
    }
}
