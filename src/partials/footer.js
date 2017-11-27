import React from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-inner fl-cont fl-center-h">
                    <div className="fl-wrap fl-grow">
                    </div>
                    <div className="fl-wrap padd-ri-10 footer-company">
                        <Link to='/exchange' className="footer-link">
                            <h6 className="no-marg footer-text">© 2017 Galactic Exchange</h6>
                        </Link>
                    </div>
                    <div className="fl-wrap padd-left-10">
                        <a href='http://galacticexchange.io/privacy-policy' className="footer-link">
                            <h6 className="no-marg footer-text link">Privacy Policy</h6>
                        </a>
                    </div>


                    <div className="fl-wrap fl-grow">
                    </div>

                </div>

            </div>
        );
    }
}
