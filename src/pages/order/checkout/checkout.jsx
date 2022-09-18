import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import Recommendation from '../../../components/recommendation/recommendation';
import OrderItems from '../../../components/order-items/order-items';

class Checkout extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Recommendation />
                <OrderItems />
                <h1>Hello !</h1>
            </React.Fragment>
        );
    }
    componentDidMount() {
        this.props.updateLoadingStatus(false)
    }

    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);