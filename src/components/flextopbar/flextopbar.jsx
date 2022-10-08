import React, { Component } from 'react';
import './flextopbar.scoped.css';
import { GrCart } from 'react-icons/gr';
import AuthenticationService from '../../services/public/authenticationservice';

class FlexTopBar extends Component {
    state = {
        outlet: null
    }
    componentDidMount = () => {
        const authService = new AuthenticationService()
        let outlet = JSON.parse(authService.retrieveInfo('outlet'));
        this.setState({outlet})
    }
    render() {
        return (
            <div className='flex-top-bar'>
                <div>
                    <div className='flex-group'>
                        <GrCart className='flex-title-icon' />
                        <span className='flex-title'>{this.props.title}</span>
                    </div>
                    <span className='flex-subtitle'>{`${this.state.outlet?.name} - ${this.state.outlet?.city}`}</span>
                </div>
            </div>
        );
    }
}

export default FlexTopBar;