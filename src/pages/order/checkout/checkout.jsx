import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { Link } from 'react-router-dom';
import Recommendation from '../../../components/recommendation/recommendation';
import OrderItems from '../../../components/order-items/order-items';
import './checkout.scoped.css';
import StorageService from '../../../services/public/storageservice';

class Checkout extends Component {
    state = {
        cart: []
    }

    render() {
        return (
            <React.Fragment>
                <Recommendation />
                <OrderItems cart={this.state.cart}/>
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
        const storageService = new StorageService()
        let cart = JSON.parse(storageService.retrieveInfo('cart'))
        this.setState({cart})
        this.props.updateLoadingStatus(false)
    }

    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);