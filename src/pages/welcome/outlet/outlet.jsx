import React, { Component } from 'react';
import { Input, Button, Modal } from 'antd';
import { IoMdExit } from 'react-icons/io';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import AuthenticationService from '../../../services/public/authenticationservice.js';
import DefaultCompanyLogo from '../../../assets/images/powered-logo-loader.png'
import './outlet.scoped.css';
import ShopService from '../../../services/public/shopservice';
import { compose } from '@reduxjs/toolkit';
import CountryPhoneInput from 'antd-country-phone-input';
import { withRouter } from '../../../components/withRouter/withRouter';
import { useParam } from '../../../components/useParam/useParam';
import { useLocation } from '../../../components/useLocation/useLocation';

class Outlet extends Component {
    state = {
        phoneNumber: { short: 'MY' },
        loginAsGuest: false,
        outlet: {
            id: '',
            name: '',
            city: '',
            location: ''
        },
        userData: {
            name: '',
            email: '',
            phone: ''
        },
        status: {
            name: '',
            email: '',
            phone: '',
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='flex-top-bar'>
                    <div className='flex-content'>
                        <img className='store-logo' src={this.state.outlet.image ? `${process.env.REACT_APP_BACKEND_URL}/uploads/outlet/${this.state.outlet.image}` : DefaultCompanyLogo} alt="storelogo.png" style={{ margin: 'auto' }} />
                        <div className='flex-group'>
                            <span className='flex-title'>{this.state.outlet.name}</span>
                        </div>
                        <span className='flex-subtitle'>{this.state.outlet.city}, {this.state.outlet.location}</span>
                    </div>
                </div>
                <div className='inner-layout'>
                    <div className="main-container">
                        <div className='login-title tab'>
                            <span onClick={() => this.loginAsGuest(false)} style={{ color: this.state.loginAsGuest ? null : 'orange' }}>Login</span>
                            <span onClick={() => this.loginAsGuest(true)} style={{ color: this.state.loginAsGuest ? 'orange' : null }}>Guest</span>
                        </div>
                        <div className="input-container" style={{display: this.state.loginAsGuest? 'none' : 'block'}}>
                            <div className="input-holder">
                                <Input placeholder='Name' status={this.state.status.name} value={this.state.userData.name} onChange={(e) => this.handleChange('name', e)} />
                            </div>
                            <div className="input-holder">
                                <Input placeholder='Email' status={this.state.status.email} value={this.state.userData.email} onChange={(e) => this.handleChange('email', e)} />
                            </div>
                            <div className="input-holder">
                                <CountryPhoneInput type='number' placeholder='Phone Number' status={this.state.status.phone} value={this.state.phoneNumber} onChange={(e) => this.handlePhoneChange(e)} />
                            </div>
                        </div>
                        <div className='btn-holder'>
                            <Button className='btn-confirm' type='primary' onClick={this.save}>
                                <span>{this.state.loginAsGuest? "Continue as guest" : "Let's go"}</span>
                                <IoMdExit />
                            </Button>
                        </div>
                        <h5>
                            Powered By centricpos.com
                        </h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        let outlet_id = this.props.params.outlet_id
        let table_id = this.findTable()
        const authService = new AuthenticationService()
        const shopService = new ShopService()

        authService.isLoggedIn(outlet_id).then((isLoggedIn) => {
            if (isLoggedIn) {
                authService.checkTable(table_id).then((isPreviousTable) => {
                    if (isPreviousTable) {
                        let searchParams = this.props.location.search
                        this.props.navigate(`/outlet/${outlet_id}/user/menu/menu-items${searchParams}`)
                    }
                })
            }
        })

        if (!table_id) {
            this.showErrorDialog(
                'Error',
                'Table not found :<('
            )
        } else {
            shopService.validateTable(outlet_id, table_id).then((response) => {
                if (response.data != null) {
                    authService.setInfo(['table', JSON.stringify(response.data)])
                } else {
                    this.showErrorDialog(
                        'Error',
                        'Invalid Table :<('
                    )
                }
            })
        }

        shopService.index(outlet_id).then((response) => {
            if (response.status === 200) {
                let outlet = response.data
                authService.setInfo(['outlet', JSON.stringify(outlet)])
                this.setState({ outlet })
                this.props.updateLoadingStatus(false)
            }
        })
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    showErrorDialog = (title, message) => {
        Modal.error({
            title: title,
            content: message,
            centered: true,
            closable: false,
            okButtonProps: { style: { display: 'none' } }
        })
    }
    loginAsGuest = (isGuestLogin) => {
        let userData = {
            name: '',
            email: '',
            phone: ''
        }

        if (isGuestLogin) {
            userData.name = userData.email = userData.phone ='Guest'
        }

        this.setState({
            userData,
            loginAsGuest: isGuestLogin
        })
    }
    loginAsGuest = (isGuestLogin) => {
        let userData = {
            name: '',
            email: '',
            phone: ''
        }

        if (isGuestLogin) {
            userData.name = 'Customer'
            userData.email = 'customercentricpos@gmail.com'
            userData.phone = '60123456789'
        }

        this.setState({
            userData,
            loginAsGuest: isGuestLogin
        })
    }
    loginAsGuest = (isGuestLogin) => {
        let userData = {
            name: '',
            email: '',
            phone: ''
        }


        if (isGuestLogin) {
            userData.name = 'Customer'
            userData.email = 'customercentricpos@gmail.com'
            userData.phone = '60123456789'
        }

        this.setState({
            userData,
            loginAsGuest: isGuestLogin
        })
    }


    handleChange = (key, event) => {
        let temp = {}
        temp[key] = event.target.value
        let userData = { ...this.state.userData, ...temp }
        this.setState({ userData })
    }

    handlePhoneChange = (event) => {
        if (event.code !== undefined && event.phone !== undefined) {
            let phoneNumber = `${event.code}${event.phone}`
            let userData = { ...this.state.userData, phone: phoneNumber }
            this.setState({ userData })
        }
    }

    checkInput = () => {
        let warningstatus = 'error'
        let hasError = false
        let status = {
            name: '',
            email: '',
            phone: '',
        }

        let name = this.state.userData.name
        let email = this.state.userData.email
        let phone = this.state.userData.phone

        let emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let phoneRule = /^\d+$/
        if (name.length < 3) {
            status.name = warningstatus
            hasError = true
        }
        if (!email.length || !emailRule.test(email)) {
            status.email = warningstatus
            hasError = true
        }
        if (phone.length < 10 || !phoneRule.test(phone)) {
            status.phone = warningstatus
            hasError = true
        }
        this.setState({ status })
        return !hasError
    }

    findTable = () => {
        var url = new URL(window.location.href);
        return url.searchParams.get("table_id");
    }

    save = () => {

        // skip input check while guest login
        let checkInput = this.state.loginAsGuest? true : this.checkInput()


        if (checkInput && !this.props.isLoading) {
            this.props.updateLoadingStatus(true)
            const authService = new AuthenticationService();

            authService.setInfo(['is_guest_login', this.state.loginAsGuest])
            authService.setInfo(['name', this.state.userData.name])
            authService.setInfo(['email', this.state.userData.email])
            authService.setInfo(['phone', this.state.userData.phone])
            authService.setInfo(['outlet_id', this.state.outlet.id])
            authService.setInfo(['cart', JSON.stringify([])])
            authService.setInfo(['cart_history', JSON.stringify([])])

            let searchParams = this.props.location.search
            this.props.navigate(`/outlet/${this.state.outlet.id}/user/menu/menu-items${searchParams}`)
        }
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default compose(
    useParam,
    useLocation,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Outlet);