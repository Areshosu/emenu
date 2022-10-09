import React, { Component } from 'react';
import { Button } from 'antd';
import './order-items.scoped.css';
import _ from 'lodash';

class OrderItems extends Component {
    state = {}
    renderItemTotal (cart) {
        let itemPrice = Number(cart.item.price1)
        let condimentsPrice = Number(_.sum(_.pluck(cart.condiments,'amount')))
        return _.round((itemPrice + condimentsPrice) * cart.quantity ,2)
    }
    render() {
        return (
            <div className='order-items-container'>
                <div className='order-main-title'>ORDER ITEM(S)</div>
                {
                    this.props.cart.map((cart,index) =>
                    <div className='external-box-container' key={'container-'+index}>
                        <div className='inner-box-container'>
                            <div className='inner-box-item order-item-subtitle'>{cart.item.name1}</div>
                            <div className='inner-box-item'>
                                <div className='switch-increase'>
                                    <Button type='primary' size='small' onClick={() => this.props.updateQuantity(false,index)}>-</Button>
                                    <span className='switch-increase-inner'>{cart.quantity}</span>
                                    <Button type='primary' size='small' onClick={() => this.props.updateQuantity(true,index)}>+</Button>
                                </div>
                            </div>
                            <div className='inner-box-item order-item-title'>RM {this.renderItemTotal(cart)}</div>
                        </div>
                        <div className="inner-box-container customize" 
                        onClick={() => this.props.showModal(
                            cart.item,
                            cart.available_condiments,
                            // edit
                            cart,
                            index
                            )}>
                            Customize
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
}

export default OrderItems;