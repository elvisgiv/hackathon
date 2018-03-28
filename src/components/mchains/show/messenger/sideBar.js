import React, { Component } from 'react';
import '../../../../stylesheets/commons/messenger/sideBar.scss';


export class SideBar extends Component {
    render() {
        return (
            <div className={'rce-sbar light'}>
                <div className="rce-sbar-item">
                    {this.props.top}
                </div>
                <div className="rce-sbar-item rce-sbar-item__center">
                    {this.props.center}
                </div>
                <div className="rce-sbar-item">
                    {this.props.bottom}
                </div>
            </div>
        );
    }
}

SideBar.defaultProps = {
    top: null,
    center: null,
    bottom: null,
    type: 'dark',
}

export default SideBar;
