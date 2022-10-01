import React, { Component } from 'react';
import { BsPhone } from 'react-icons/bs'
import { IoMail } from 'react-icons/io5'
import Avatar from '../../assets/images/user-default.jpg'
import AuthenticationService from '../../services/public/authenticationservice';
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
        const authService = new AuthenticationService();
        let userData = {
            name:  authService.retrieveInfo('name'),
            email: authService.retrieveInfo('email'),
            phone: authService.retrieveInfo('phone'),
        }
        this.setState({userData})
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
                    <a href="https://pacomsolution.com" target="_blank" rel="noopener noreferrer">
                        <span className='powered-title text-style'> Powered by @pacomsolution.com </span>
                    </a>
                </li>
            </div>
        );
    }
}

export default SideBar;