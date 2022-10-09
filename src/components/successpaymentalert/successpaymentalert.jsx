import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { MdOutlineInsertEmoticon } from 'react-icons/md'
import './successpaymentalert.scoped.css';
import { useLocation } from '../useLocation/useLocation';
import { compose } from '@reduxjs/toolkit';
import { useParam } from '../useParam/useParam';
import { withRouter } from '../withRouter/withRouter';

class SuccessPaymentAlert extends Component {
    state = {
        outlet_id: null,
        order_id: null,
        currency: null,
        amount: null,
        paid: null,
        status: null,
        signature: null
    }
    componentDidMount() {
        let listOfParams = this.props.location.search?.substring(1).split('&')

        let outlet_id = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'ref1')))
        let order_id = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'ref2')))

        let currency = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'currency')))
        let amount = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'amount')))

        let status = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'status')))
        let paid = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'paid')))
        let signature = this.mapKeyValue(listOfParams?.find((i) => this.findKey(i,'signature')))

        this.setState({
            outlet_id,
            order_id,
            currency,
            amount,
            paid,
            status,
            signature
        })
    }
    findKey(item,key) {
        return item?.split('=')[0] === key
    }
    mapKeyValue(item) {
        return item?.split('=')[1]
    }
    payoutHistory = () => {
        let outlet_id = this.props.params.outlet_id
        let searchParams = this.props.location.search
        this.props.navigate(`/outlet/${outlet_id}/user/order/payout-history${searchParams}`)
    }
    render() {
        return (
            <Modal visible={this.props.visible} closable={false} footer={null}>
                <div className='success-title'>{this.state.paid? 'Payment Success !':'Payment Status'}</div>
                <div className="row-content-center">
                    <MdOutlineInsertEmoticon color='green' size={50}/>
                </div>
                <div className="row-content-between">
                    <span>Order ID</span>
                    <span>{this.state.order_id}</span>
                </div>
                <div className="row-content-between">
                    <span>Amount</span>
                    <span>{this.state.currency} {this.state.amount}</span>
                </div>
                <div className="row-content-between">
                    <span>Paid Status</span>
                    <span>{this.state.paid? 'Completed':'Pending'}</span>
                </div>
                <div className="row-content-between">
                    <span>Signature</span>
                    <span>{this.state.signature}</span>
                </div>
                <div className="row-content-center">
                    <Button type='primary' onClick={this.payoutHistory}>Go to cart</Button>
                </div>
            </Modal>
        );
    }
}

export default compose(
    useParam,
    useLocation,
    withRouter
)(SuccessPaymentAlert);