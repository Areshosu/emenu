import { compose } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { BsPhone } from 'react-icons/bs'
import { IoMail } from 'react-icons/io5'
import Avatar from '../../assets/images/user-default.jpg'
import AuthenticationService from '../../services/public/authenticationservice';
import { useLocation } from '../useLocation/useLocation';
import { useParam } from '../useParam/useParam';
import { withRouter } from '../withRouter/withRouter';
import './sidebar.scoped.css'

class SideBar extends Component {
    state = {
        userData: {
            name: '',
            email: '',
            phone: ''
        }
    }

    componentDidMount = () => {
        const authService = new AuthenticationService()
        let userData = {
            name:  authService.retrieveInfo('name'),
            email: authService.retrieveInfo('email'),
            phone: authService.retrieveInfo('phone'),
        }
        this.setState({userData})
    }

    logOut = () => {
        let outlet_id = this.props.params.outlet_id
        const authService = new AuthenticationService()
        authService.deleteInfo()

        let searchParams = this.props.location.search
        this.props.navigate(`/welcome/outlet/${outlet_id}${searchParams}`)
    }

    payoutHistory = () => {
        let outlet_id = this.props.params.outlet_id
        let searchParams = this.props.location.search
        this.props.navigate(`/outlet/${outlet_id}/user/order/payout-history${searchParams}`)
    }
    
    render() {
        return (
            <div className='side-bar-main'>
                <li>
                    <a href="#/">
                        <div className='avatar-container'>
                            <img className='avatar-view' src={Avatar} alt="user-avatar.jpg" />
                                <span className='user-title text-style'> {this.state.userData.name} </span>
                                    <span className='user-description text-style'>
                                        <BsPhone className='icon-style' />
                                        + {this.state.userData.phone}
                                    </span>
                                <span className='user-description text-style'>
                                    <IoMail className='icon-style' />
                                    {this.state.userData.email}
                                </span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#/" rel="noopener noreferrer" onClick={this.payoutHistory}>
                        <span className='powered-title text-style'> Payment History </span>
                    </a>
                </li>
                <li>
                    <a href="#/" rel="noopener noreferrer" onClick={this.logOut}>
                        <span className='powered-title text-style'> Logout </span>
                    </a>
                </li>
                <li>
                    <a href="https://pacomsolution.com" target="_blank" rel="noopener noreferrer">
                        <span className='powered-title text-style'> Powered by @pacomsolution.com </span>
                    </a>
                </li>
            </div>
        );
    }
}

export default compose(
    withRouter,
    useParam,
    useLocation
)(SideBar);