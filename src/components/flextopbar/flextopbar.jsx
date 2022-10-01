import React, { Component } from 'react';
import './flextopbar.scoped.css';
import { GrCart } from 'react-icons/gr';

class FlexTopBar extends Component {
    state = {}
    componentDidMount = () => {
        
    }
    render() {
        return (
            <div className='flex-top-bar'>
                <div>
                    <div className='flex-group'>
                        <GrCart className='flex-title-icon' />
                        <span className='flex-title'>ORDER CART</span>
                    </div>
                    <span className='flex-subtitle'>Burger mamak store</span>
                </div>
            </div>
        );
    }
}

export default FlexTopBar;