import { compose } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { useLocation } from '../../../components/useLocation/useLocation';
import { withRouter } from '../../../components/withRouter/withRouter';
import { LoadingOutlined } from '@ant-design/icons';

class Payment extends Component {
    state = {}
    async componentDidMount() {
        this.props.updateLoadingStatus(false)
        let searchParams = this.props.location.search
        let listOfSearchParams = this.props.location.search?.substring(1).split('&')

        let outlet_id = this.mapKeyValue(listOfSearchParams.find((i) => this.findKey(i, 'ref1')))
        let order_id = this.mapKeyValue(listOfSearchParams.find((i) => this.findKey(i, 'ref2')))

        if (outlet_id != null && order_id != null) {
            setTimeout(() => {
                this.props.navigate(`/outlet/${outlet_id}/user/order/checkout${searchParams}&order_id=${order_id}`)
            }, 3000);
        }
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    findKey(item, key) {
        return item?.split('=')[0] === key
    }
    mapKeyValue(item) {
        return item?.split('=')[1]
    }
    render() {
        return (
            <React.Fragment>
                <span>Please wait to be redirect to another page</span>
                <LoadingOutlined style={{ fontSize: 24 }} spin />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { updateLoadingStatus }

export default compose(
    useLocation,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Payment);