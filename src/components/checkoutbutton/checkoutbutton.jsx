import React from 'react';
import { Link } from 'react-router-dom'
import { Affix, Badge } from 'antd';
import { RiShoppingCartLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import './checkoutbutton.scoped.css'
import { useSelector } from 'react-redux';

function CheckoutButton(props) {

    const carts = useSelector(state => state.menu);

    const renderCartCount = (carts) => {
        let cartCount = 0
        carts.forEach((c) => cartCount += c.quantity) 
        return cartCount
    }

        return (
            <Affix offsetBottom={25}>
                <Link className='checkout-btn' to={`../../order/checkout${props.location.search}`}>
                    <Badge count={renderCartCount(carts.cart)}>
                        <RiShoppingCartLine className='checkout-btn-icon'/>
                    </Badge>
                    <span className='checkout-btn-title'>Checkout</span>
                    <IoIosArrowForward className='forward-icon'/>
                </Link>
            </Affix>
        );
}
 
export default  CheckoutButton;