import React, { Component } from 'react';
import './payout-history.scoped.css'
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { connect } from 'react-redux';
import { Modal, Button, message, Spin } from 'antd';
import { AiFillSmile } from 'react-icons/ai';
import NoAvailableImage from '../../../assets/images/no_image.png'
import StorageService from '../../../services/public/storageservice';
import ShopService from '../../../services/public/shopservice';
import _ from 'lodash';
import { compose } from '@reduxjs/toolkit';
import { useParam } from '../../../components/useParam/useParam';

class PayoutHistory extends Component {
    state = {
        outlet: null,
        cart_history: [],
        modal_visibility: false,
        current_item: null,
        isLoading: false
    }
    componentDidMount() {

        const storageService = new StorageService()
        let cart_history = JSON.parse(storageService.retrieveInfo('cart_history'))
        let outlet = JSON.parse(storageService.retrieveInfo('outlet'))
        this.setState({ cart_history, outlet })

        this.props.updateLoadingStatus(false)
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    showOrder = (order_id) => {
        let outlet_id = this.props.params.outlet_id
        message.warn('Please wait while we retrieving your order information', 1)

        const shopService = new ShopService()
        shopService.showOrder(outlet_id, order_id).then((response) => {
            if (response.status === 200) {
                let current_item = response.data
                let modal_visibility = true
                this.setState({ current_item, modal_visibility })
            } else {
                message.error('Something went wrong! :<(', 1)
            }
        })
    }
    renderItemDescription(order_item) {
        let item = order_item.menu_item.description
        let condiment = _.pluck(order_item.online_order_fragment, 'condiment_item.description').join(',')
        if (order_item.online_order_fragment.length > 0) {
            item += ' with '
            item += condiment
        }
        return item
    }
    renderItemPrice(order_item) {
        let item_price = Number(order_item.price)
        let condiment_price = Number(_.sum(_.pluck(order_item.online_order_fragment, 'price')))
        return (item_price + condiment_price) * order_item.quantity
    }
    hideModal = () => {
        let modal_visibility = false
        this.setState({ modal_visibility })
    }
    pay = (outlet_id,order_id) => {
        let isLoading = !this.state.isLoading;
        this.setState({isLoading})
        const shopService = new ShopService()
        shopService.pay(outlet_id,order_id).then((response) => {
            if (response.status === 200) {
                message.warn('You will be redirect to continue your payment,please do not go anywhere :)',8)
                setTimeout(() => {
                    window.location.href = response.data.bill_url
                }, 2000);
            } else {
                message.warn(response.message,8)
            }
        }).finally(() => {
            isLoading = false
            this.setState({isLoading})
        })
    }

    orderStatus(current_item) {
        if (current_item.status === 1) {
            if (current_item.online_payment) {
                if (current_item.paid) {
                    return 'Order Paid'
                }
                    return 'Order Unpaid (Online Payment)'
            } else {
                return 'Pay At Cashier'
            }
        }

        if (current_item.status === 2)
            return 'Order Accepted'

        if (current_item.status === 3)
            return 'Order Rejected'

        if (current_item.status === 4)
            return 'Order Completed'
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    {
                        this.state.cart_history.map((cart_history, index) =>
                            <li className='row' key={'cart-h-' + index}>
                                <ul className='row-item item-content item-decor' onClick={() => this.showOrder(cart_history.id)}>
                                    <div className='side-content'>
                                        <img className='side-image' src={this.state.outlet?.image? `${process.env.REACT_APP_BACKEND_URL}/uploads/outlet/${this.state.outlet.image}` : NoAvailableImage} alt="shop_image.png" />
                                        <div className='side-subtitle'> {cart_history.date} </div>
                                    </div>
                                    <div className='main-content'>
                                        <div className='content-title'>
                                            Order ID: {cart_history.id}
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        )
                    }
                </section>
                <Modal visible={this.state.modal_visibility} onCancel={this.hideModal} footer={null}>
                    {
                        this.state.current_item &&
                        <div className="modal-content">
                            <div className="row row-center">
                                <span>Payment Receipt</span>
                            </div>
                            <br />
                            <div className="row row-center">
                                <AiFillSmile size={50} color="green" />
                            </div>
                            <br />
                            <div className="row row-between">
                                <span>Payment type</span>
                                <span>{this.state.current_item.online_payment ? 'Ebizz Online Payment' : 'Cashier Payment'}</span>
                            </div>
                            <div className="row row-between">
                                <span>Mobile</span>
                                <span>{this.state.current_item.mobile}</span>
                            </div>
                            <div className="row row-between">
                                <span>Email</span>
                                <span>{this.state.current_item.email}</span>
                            </div>
                            <div className="row row-between">
                                <span>Status</span>
                                <span>{this.orderStatus(this.state.current_item)}</span>
                            </div>
                            <div className="row row-between">
                                <span>Order ID</span>
                                <span>{this.state.current_item.online_order_uuid}</span>
                            </div>
                            <br />
                            <div className="row row-center">
                                <span>Order Items</span>
                            </div>
                            <br />
                            {
                                this.state.current_item.online_order.map((item, index) =>
                                    <div className="row row-between" key={'order-item-' + index}>
                                        <span className='order-item-subtitle'>{this.renderItemDescription(item)}</span>
                                        <div className="order-item-midtitle">{`x ${item.quantity}`}</div>
                                        <span>{`RM ${this.renderItemPrice(item)}`}</span>
                                    </div>
                                )
                            }
                            <br />
                            <div className="row row-between">
                                <span className='order-item-subtitle'>Tax</span>
                                <span>{`RM ${this.state.current_item.taxtotal}`}</span>
                            </div>
                            <div className="row row-between">
                                <span className='order-item-subtitle'>Service Tax</span>
                                <span>{`RM ${this.state.current_item.svctotal}`}</span>
                            </div>
                            <div className="row row-between">
                                <span>Rounding Adjustment</span>
                                <span>{`RM ${this.state.current_item.rounding}`}</span>
                            </div>
                            <div className="row row-between">
                                <span>Total Amount</span>
                                <span>{`RM ${this.state.current_item.total}`}</span>
                            </div>
                            {
                                !!this.state.current_item.online_payment && !this.state.current_item.paid &&
                                <div className="row row-center">
                                    <Button type='primary' onClick={() => this.pay(this.props.params.outlet_id,this.state.current_item.online_order_uuid)}>
                                        <span>Click here to Continue Payment</span>
                                        <Spin spinning={this.state.isLoading}/>
                                    </Button>
                                </div>
                            }
                        </div>
                    }
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default compose(
    useParam,
    connect(mapStateToProps, mapDispatchToProps)
)(PayoutHistory);