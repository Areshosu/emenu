import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { IoMdExit } from 'react-icons/io';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import AuthenticationService from '../../../services/public/authenticationservice';
import StoreLogo from '../../../assets/images/powered-logo-loader.png'
import './outlet.scoped.css';

class Outlet extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className='flex-top-bar'>
                    <div className='flex-content'>
                        <img className='store-logo' src={StoreLogo} alt="storelogo.png" style={{margin: 'auto'}}/>
                        <div className='flex-group'>
                            <span className='flex-title'>Japanese Store</span>
                        </div>
                        <span className='flex-subtitle'>Burger mamak store</span>
                    </div>
                </div>
                <div className='inner-layout'>
                    <div className="main-container">
                        <div className='login-title tab'>
                            <span>Login</span>
                        </div>
                        <div className="input-holder">
                            <Input placeholder='Email' />
                        </div>
                        <div className="input-holder">
                            <Input placeholder='Phone Number' />
                        </div>
                        <div className='btn-holder'>
                            <Button className='btn-confirm' type='primary'>
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
        this.props.updateLoadingStatus(false)
        const authService = new AuthenticationService()
        let outlet_id = window.location.href.split('/')[5]
        console.log(authService.isLoggedIn(outlet_id))
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Outlet);