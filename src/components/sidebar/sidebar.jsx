import { compose } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { BsPhone } from 'react-icons/bs'
import { IoMail } from 'react-icons/io5'
import Avatar from '../../assets/images/user-default.jpg';
import { IoChevronBackOutline } from 'react-icons/io5';
import AuthenticationService from '../../services/public/authenticationservice';
import { updateSideBarVisibility } from '../../app/stores/appstatus';
import { useLocation } from '../useLocation/useLocation';
import { useParam } from '../useParam/useParam';
import { withRouter } from '../withRouter/withRouter';
import './sidebar.scoped.css';
import { connect } from 'react-redux';
import StorageService from '../../services/public/storageservice';

class SideBar extends Component {
    state = {
        shopImage: null,
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
        let shopImage = this.findShopImage()
        this.setState({ userData, shopImage })

        let self = this
        window.addEventListener('resize',function(){
            if (window.innerWidth > 900) {
                self.props.updateSideBarVisibility(true)
            }
        })
    }

    findShopImage = () => {
        const storageService = new StorageService()
        let shop = JSON.parse(storageService.retrieveInfo('outlet'))
        return shop.image
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
            <div className='side-bar-main' id='sidebar' style={{display: this.props.sidebarVisibility? 'block':'none'}}>
                <li className='list-top-item'>
                    <IoChevronBackOutline className='sidebar-back' size={30} onClick={() => this.props.updateSideBarVisibility(false)}/>
                </li>
                <li className='list-top-item'>
                    <a href="#/">
                        <div className='avatar-container'>
                            <img className='avatar-view' src={this.state.shopImage? `${process.env.REACT_APP_BACKEND_URL}/uploads/outlet/${this.state.shopImage}` : Avatar} alt="user-avatar.jpg" />
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
                <li className='list-item'>
                    <a href="#/" rel="noopener noreferrer" onClick={this.payoutHistory}>
                        <span className='powered-title text-style'> Payment History </span>
                    </a>
                </li>
                <li className='list-item'>
                    <a href="#/" rel="noopener noreferrer" onClick={this.logOut}>
                        <span className='powered-title text-style'> Logout </span>
                    </a>
                </li>
                <li className='list-item'>
                    <a href="https://centricpos.com" target="_blank" rel="noopener noreferrer">
                        <span className='powered-title text-style'> Powered by centricpos.com </span>
                    </a>
                </li>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ sidebarVisibility: state.appstat.sidebarVisibility })

const mapDispatchToProps = { updateSideBarVisibility }

export default compose(
    withRouter,
    useParam,
    useLocation,
    connect(mapStateToProps,mapDispatchToProps)
)(SideBar);