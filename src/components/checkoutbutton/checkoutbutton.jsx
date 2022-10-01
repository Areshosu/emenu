import React from 'react';
import { Link } from 'react-router-dom'
import { Affix, Badge } from 'antd';
import { RiShoppingCartLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import './checkoutbutton.scoped.css'

function CheckoutButton() {
        return (
            <Affix offsetBottom={25}>
                <Link className='checkout-btn' to="../../order/checkout">
                    <Badge count={1}>
                        <RiShoppingCartLine className='checkout-btn-icon'/>
                    </Badge>
                    <span className='checkout-btn-title'>Checkout</span>
                    <IoIosArrowForward className='forward-icon'/>
                </Link>
            </Affix>
        );
}
 
export default CheckoutButton;