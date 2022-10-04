import React, { Component } from 'react';
import { Button } from 'antd';
import './order-items.scoped.css';

class OrderItems extends Component {
    state = {}
    render() {
        return (
            <div className='order-items-container'>
                <div className='order-item-title'>ORDER ITEM(S)</div>
                {
                    this.props.cart.map((c,i) =>
                        <div className='inner-box-container' key={'item-'+i}>
                            <div className='inner-box-item order-item-subtitle'>{c.item.name1}</div>
                            <div className='inner-box-item' style={{ marginLeft: 'auto' }}>
                                <div className='switch-increase'>
                                    <Button type='primary' size='small'>-</Button>
                                    <span className='switch-increase-inner'>{c.quantity}</span>
                                    <Button type='primary' size='small'>+</Button>
                                </div>
                            </div>
                            <div className='inner-box-item order-item-title'>RM 38</div>
                        </div>
                    )
                }
                {/* <div className="inner-box-container">
                    <div className="inner-box-item customize">Customize</div>
                </div> */}
            </div>
        );
    }
}

export default OrderItems;