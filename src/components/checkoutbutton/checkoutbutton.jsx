import React, { Component } from 'react';
import { Affix, Badge } from 'antd';
import { RiShoppingCartLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import './checkoutbutton.scoped.css'

class CheckoutButton extends Component {
    state = {  } 
    render() { 
        return (
            <Affix offsetBottom={25}>
                <div className='checkout-btn'>
                    <Badge count={1}>
                        <RiShoppingCartLine className='checkout-btn-icon'/>
                    </Badge>
                    <span className='checkout-btn-title'>Checkout</span>
                    <IoIosArrowForward className='forward-icon'/>
                </div>
            </Affix>
        );
    }
}
 
export default CheckoutButton;