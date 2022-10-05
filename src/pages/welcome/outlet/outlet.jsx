import React, { Component } from 'react';
import { Input, Button, Modal } from 'antd';
import { IoMdExit } from 'react-icons/io';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import AuthenticationService from '../../../services/public/authenticationservice.js';
import StoreLogo from '../../../assets/images/powered-logo-loader.png'
import './outlet.scoped.css';
import ShopService from '../../../services/public/shopservice';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from '../../../components/withRouter/withRouter';
import { useParam } from '../../../components/useParam/useParam';
import { useLocation } from '../../../components/useLocation/useLocation';

class Outlet extends Component {
    state = {
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
                        <img className='store-logo' src={StoreLogo} alt="storelogo.png" style={{margin: 'auto'}}/>
                        <div className='flex-group'>
                            <span className='flex-title'>{this.state.outlet.name}</span>
                        </div>
                        <span className='flex-subtitle'>{this.state.outlet.city}, {this.state.outlet.location}</span>
                    </div>
                </div>
                <div className='inner-layout'>
                    <div className="main-container">
                        <div className='login-title tab'>
                            <span>Login</span>
                        </div>
                        <div className="input-holder">
                            <Input placeholder='Name' status={this.state.status.name} value={this.state.userData.name} onChange={(e) => this.handleChange('name',e)}/>
                        </div>
                        <div className="input-holder">
                            <Input placeholder='Email' status={this.state.status.email} value={this.state.userData.email} onChange={(e) => this.handleChange('email',e)}/>
                        </div>
                        <div className="input-holder">
                            <Input placeholder='Phone Number' status={this.state.status.phone} value={this.state.userData.phone} onChange={(e) => this.handleChange('phone',e)}/>
                        </div>
                        <div className='btn-holder'>
                            <Button className='btn-confirm' type='primary' onClick={this.save}>
                                <span>let's go</span>
                                <IoMdExit />
                            </Button>
                        </div>
                        <h5>
                            Powered By @Pacomsolution
                        </h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        let outlet_id = this.props.params.outlet_id
        let table_id = this.checkTable()
        const authService = new AuthenticationService()
        const shopService = new ShopService()

        if (!table_id) {
            this.showErrorDialog(
                'Error',
                'Table not found :<('
            )
        } else {
            shopService.validateTable(outlet_id,table_id).then((response) => {
                if (response.data != null) {
                    authService.setInfo(['table_id',table_id])   
                } else {
                    this.showErrorDialog(
                        'Error',
                        'Invalid Table :<('
                    )   
                }
            })
        }

        authService.isLoggedIn(outlet_id).then((isLoggedIn) => {
            if (isLoggedIn) {
                let searchParams = this.props.location.search
                    this.props.navigate(`/outlet/${outlet_id}/user/menu/menu-items${searchParams}`)
            }
        })

            shopService.index(outlet_id).then((res) => {
                let outlet = res.data
                authService.setInfo(['outlet',JSON.stringify(outlet)])
                this.setState({outlet})
                this.props.updateLoadingStatus(false)
       })
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    showErrorDialog = (title,message) => {
        Modal.error({
            title: title,
            content: message,
            centered: true,
            closable: false,
            okButtonProps: {style: {display: 'none'}}
        })
    }

    handleChange = (key,event) => {
        let temp = {}
        temp[key] = event.target.value
        let userData = {...this.state.userData,...temp}
        this.setState({userData})
    }

    checkInput = () => {
        let warningstatus = 'error'
        let hasError = false
        let status = {
            name: '',
            email: '',
            phone: '',
        }
        if (!this.state.userData.name.length) {
            status.name = warningstatus
            hasError = true
        }
        if (!this.state.userData.email.length) {
            status.email = warningstatus
            hasError = true
        }
        if (!(this.state.userData.phone.length > 8)) {
            status.phone = warningstatus
            hasError = true
        }
        this.setState({status})
        return !hasError
    }

    checkTable = () => {
        var url = new URL(window.location.href);
        return url.searchParams.get("table_id");
    }

    save = () => {

        if (this.checkInput() && !this.props.isLoading) {
            this.props.updateLoadingStatus(true)
            const authService = new AuthenticationService();
            authService.setInfo(['name',this.state.userData.name])
            authService.setInfo(['email',this.state.userData.email])
            authService.setInfo(['phone',this.state.userData.phone])
            authService.setInfo(['outlet_id',this.state.outlet.id])
            authService.setInfo(['cart',JSON.stringify([])])

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