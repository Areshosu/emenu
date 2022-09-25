import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Recommendation from '../../../components/recommendation/recommendation';
import OrderItems from '../../../components/order-items/order-items';
import './checkout.scoped.css';

class Checkout extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Recommendation />
                <OrderItems />
                <div className='external-container'>
                <div className='justify-space'>
                    <span>TOTAL PAYMENT</span>
                    <span>RM 38.90</span>
                </div>
                <div className='justify-center'>
                <Link className='confirm-btn' to="/order/checkout">
                    <span className='confirm-btn-title'>CONFIRM ORDER</span>
                </Link>
                </div>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.updateLoadingStatus(false)
        }, 1500);
    }

    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);