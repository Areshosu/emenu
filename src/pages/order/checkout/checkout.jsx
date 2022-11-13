import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import Recommendation from '../../../components/recommendation/recommendation';
import CondimentModal from '../../../components/condimentmodal/condimentmodal';
import SuccessPaymentAlert from '../../../components/successpaymentalert/successpaymentalert';
import OrderItems from '../../../components/order-items/order-items';
import './checkout.scoped.css';
import StorageService from '../../../services/public/storageservice';
import MenuItemsService from '../../../services/public/menuitemservice';
import { updateCart } from '../../../app/stores/menu';
import _ from 'lodash';
import ShopService from '../../../services/public/shopservice';
import { compose } from '@reduxjs/toolkit';
import { useParam } from '../../../components/useParam/useParam';
import { Collapse, Checkbox, Modal, message } from 'antd';
import { withRouter } from '../../../components/withRouter/withRouter';
import { useLocation } from '../../../components/useLocation/useLocation';
const { Panel } = Collapse;

class Checkout extends Component {
    state = {
        isEdit: false,
        cards: [],
        shop_tax: [],
        shop_currency: {
            roundPlace: 0,
            decimalPlace: 2
        },
        condimentsModalVisibility: false,
        current_item: null,
        current_index: null,
        card_condiments: [],
        payment_methods: [],
        selected_payment_method: null,
        dirtyItem: {},
        cart: [],
        error_message: null,
        error_message_visibility: false,
        success_payment_visibility: false
    }
    componentDidMount() {
        let outlet_id = this.props.params.outlet_id
        let payment_order_id = this.checkSearchParam('order_id')

        const menuitemService = new MenuItemsService()
        menuitemService.index(outlet_id).then((response) => {
            let cards = response.data.filter((c, i) => i === 0) // get first record as recommendation
            this.setState({ cards, outlet_id })
        })
        const shopService = new ShopService()
        shopService.tax(outlet_id).then((response) => {
            let shop_tax = response.data
            this.setState({ shop_tax })
        })
        shopService.currency(outlet_id).then((response) => {
            let shop_currency = {
                ...this.state.shop_tax,
                roundPlace: response.data.roundPlace,
                decimalPlace: response.data.decimalPlace
            }
            this.setState({ shop_currency })
            this.props.updateLoadingStatus(false)
        })
        shopService.payment_methods(outlet_id).then((response) => {
            if (response.status === 200) {
                let payment_methods = response.data
                this.setState({ payment_methods })
            }
        })

        if (payment_order_id != null) {
            let success_payment_visibility = true
            this.setState({ success_payment_visibility })
        }

        const storageService = new StorageService()
        let cart = JSON.parse(storageService.retrieveInfo('cart'))
        this.setState({ cart })
    }

    checkSearchParam(param) {
        let url = new URL(window.location.href);
        return url.searchParams.get(param)
    }

    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    showModal = (
        current_item, card_condiments, // new
        oldDirtyItem, editIndex //edit
    ) => {
        let isEdit = false
        let current_index = editIndex

        let condimentsModalVisibility = true
        let dirtyItem = {
            item: {
                id: current_item.id,
                description: current_item.description,
                name1: current_item.name1,
                name2: current_item.name2,
                price1: current_item.price1,
                price2: current_item.price2,
                price3: current_item.price3,
                image: current_item.image
            },
            condiments: [],
            available_condiments: [],
            addonText: '',
            isTakeout: false,
            quantity: 1
        } // reset form
        if (oldDirtyItem) {
            isEdit = true
            dirtyItem = { ...oldDirtyItem }
        }

        this.setState({
            condimentsModalVisibility,
            dirtyItem,
            current_item,
            card_condiments,

            isEdit,
            current_index
        })
    }
    hideModal = () => {
        let condimentsModalVisibility = false
        this.setState({ condimentsModalVisibility })
    }
    hidePaymentSuccessAlert = () => {
        let success_payment_visibility = false
        this.setState({ success_payment_visibility })
    }
    resetCart = () => {
        const storageService = new StorageService()

        let cart = []
        storageService.setInfo(['cart', JSON.stringify(cart)])
        this.setState({ cart })
    }
    updateDirtyItemCondiment = (event) => {
        let condiment_item = event.target.value
        let current_condiments = this.state.dirtyItem.condiments
        if (event.target.checked) {
            current_condiments = [...current_condiments, condiment_item]
        } else {
            current_condiments = current_condiments.filter((i) => i.id !== condiment_item.id)
        }
        let temp = { condiments: current_condiments }
        let dirtyItem = { ...this.state.dirtyItem, ...temp }
        this.setState({ dirtyItem })
    }
    updateDirtyItemMethod = (param) => {
        let temp = { isTakeout: param }
        let dirtyItem = { ...this.state.dirtyItem, ...temp }
        this.setState({ dirtyItem })
    }
    updateAddonText = (param) => {
        let temp = { addonText: param.target.value }
        let dirtyItem = { ...this.state.dirtyItem, ...temp }
        this.setState({ dirtyItem })
    }
    updateItemQuantity = (isAdd, index) => {
        let cart = JSON.parse(JSON.stringify(this.state.cart))
        cart[index].quantity += isAdd ? 1 : -1

        if (cart[index].quantity === 0) {
            cart.splice(index, 1)
        }

        this.setState({ cart })

        const storageService = new StorageService()
        storageService.setInfo(['cart', JSON.stringify(cart)])
    }
    updatePaymentMethod = (event) => {
        let selected_payment_method = null
        if (event.target.checked) {
            selected_payment_method = event.target.value
        }
        this.setState({ selected_payment_method })
    }

    add = () => {
        let condimentsModalVisibility = false
        const storageService = new StorageService()
        let currentCart = this.state.cart.filter((c) => true)
        let dirtyItem = { ...this.state.dirtyItem, available_condiments: this.state.card_condiments }
        let checkAndAddExistItem = this.checkAndAddExistItem(currentCart, dirtyItem)

        let cart = checkAndAddExistItem ? checkAndAddExistItem : [...currentCart, dirtyItem]
        storageService.setInfo(['cart', JSON.stringify(cart)])

        this.setState({ condimentsModalVisibility, cart })
    }

    edit = (index) => {
        const storageService = new StorageService()
        let cart = this.state.cart.filter((c) => true)

        cart[index] = { ...this.state.dirtyItem }
        this.setState({ cart })
        this.props.updateCart(cart)

        let condimentsModalVisibility = false
        this.setState({ cart, condimentsModalVisibility })
        storageService.setInfo(['cart', JSON.stringify(cart)])
    }

    save = () => {
        this.props.updateLoadingStatus(true)
        const storageService = new StorageService()
        let outlet_id = this.props.params.outlet_id
        let table_id = Number(JSON.parse(storageService.retrieveInfo('table')).id)
        let customer_name = storageService.retrieveInfo('name')

        let payload = {
            customer: {
                first_name: customer_name,
                last_name: 'customer',
                email: storageService.retrieveInfo('email'),
                mobile: storageService.retrieveInfo('phone')
            },
            items: this.state.cart,
            payment_method: this.state.selected_payment_method
        }

        if (outlet_id === null) {
            return this.showError('Outlet not found!')
        } else if (table_id === null) {
            return this.showError('Table not found!')
        } else if (payload.items.length < 1) {
            return this.showError('Cart is empty')
        } else if (payload.payment_method == null) {
            return this.showError('Invalid payment method selected')
        }

        const shopService = new ShopService()
        shopService.order(outlet_id, table_id, payload).then((response) => {
            if (response.status !== 200) {
                return this.showError('Something went wrong! :<(')
            } else {
                this.resetCart()
                this.setPayoutHistory(response.data.order_id)
                if (response.data.payment_online === true) {
                    this.pay(outlet_id, response.data.order_id)
                } else {
                    // redirect to payout history if offline payment
                    let searchParams = this.props.location.search
                    this.props.navigate(`../payout-history${searchParams}`)
                }
            }
        }).finally(() => this.props.updateLoadingStatus(false))
    }

    pay = (outlet_id, order_id) => {
        const shopService = new ShopService()
        shopService.pay(outlet_id, order_id).then((response) => {
            if (response.status === 200) {
                message.warn('You will be redirect to continue your payment,please do not go anywhere :)', 8)
                setTimeout(() => {
                    window.location.href = response.data.bill_url
                }, 2000);
            } else {
                this.showError(response.message)
            }
        }).finally(() => this.props.updateLoadingStatus(false))
    }

    hideOnError = () => {
        let error_message = ''
        let error_message_visibility = false
        this.setState({ error_message, error_message_visibility })
    }

    showError = (error_message) => {
        let error_message_visibility = true
        this.setState({ error_message, error_message_visibility })
        // stop loading incase is running
        this.props.updateLoadingStatus(false)
    }

    checkAndAddExistItem = (cart, item) => {
        let cartItem = cart.find((c) => {
            let c1 = JSON.stringify(c.item) === JSON.stringify(item.item)
            let c2 = JSON.stringify(c.condiments) === JSON.stringify(item.condiments)
            let c3 = c.isTakeout === item.isTakeout
            let c4 = c.addonText === item.addonText
            return c1 && c2 && c3 && c4
        })
        let cartItemIndex = cart.indexOf(cartItem)
        if (cartItemIndex > -1) {
            cart[cartItemIndex] = { ...cartItem, quantity: cartItem.quantity + 1 }
            return cart
        }
    }

    // calculation
    renderTotal(carts) {
        let total = 0
        carts.forEach((cart) => {
            let itemPrice = Number(cart.item.price1)
            let condimentsPrice = Number(_.sum(_.pluck(cart.condiments, 'amount')))
            total += (itemPrice + condimentsPrice) * cart.quantity
        })
        let decimalPlace = this.state.shop_currency.decimalPlace
        return _.round(total, 2).toFixed(decimalPlace)
    }

    renderTotalNet(carts) {
        let total = 0
        let tax_nets = 0

        carts.forEach((cart) => {
            let itemPrice = Number(cart.item.price1)
            let has_sst_tax =  !cart.isTakeout
            let condimentsPrice = Number(_.sum(_.pluck(cart.condiments, 'amount')))
            let price = (itemPrice + condimentsPrice) * cart.quantity
            this.state.shop_tax.forEach((tax) => tax_nets += this.calTax(price,tax,has_sst_tax))
            total += price
        })
        let net_total = total + tax_nets
        let roundPlace = this.state.shop_currency.roundPlace
        let decimalPlace = this.state.shop_currency.decimalPlace
        return this.rounding(net_total,roundPlace).toFixed(decimalPlace)
    }

    renderPerTaxTotal(carts, tax_id) {
        let tax_net = 0

        let tax = this.state.shop_tax.find((tax) => tax.id === tax_id)
        carts.forEach((cart) => {
            let itemPrice = Number(cart.item.price1)
            let has_sst_tax =  !cart.isTakeout
            let condimentsPrice = Number(_.sum(_.pluck(cart.condiments, 'amount')))
            let price = (itemPrice + condimentsPrice) * cart.quantity
            tax_net += this.calTax(price,tax,has_sst_tax)
        })
        let decimalPlace = this.state.shop_currency.decimalPlace
        return _.round(tax_net,2).toFixed(decimalPlace)
    }

    calTax (amount,tax_item,has_sst) {
        let tax = 0
        if (tax_item.is_service_charge) {
            if (has_sst) {
                tax = (amount / 100) * tax_item.value
            }
        } else {
            tax = (amount / 100) * tax_item.value
        }
        return tax
    }

    isValidOrder = () => {
        return this.state.cart.length > 0 && this.state.selected_payment_method != null
    }

    setPayoutHistory = (order_id) => {
        const storageService = new StorageService()
        let cart_history = JSON.parse(storageService.retrieveInfo('cart_history'))
        cart_history.push({
            'id': order_id,
            'date': new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        })

        storageService.setInfo(['cart_history', JSON.stringify(cart_history)])
    }

    rounding = (number,roundPlace) => {
        let fraction = 1 / roundPlace
        if (roundPlace !== 0) {
            return Math.round(number * fraction) / fraction
        } else {
            return number
        }
    }

    render() {
        return (
            <React.Fragment>
                <Recommendation cards={this.state.cards} showModal={this.showModal} />
                <OrderItems cart={this.state.cart} updateQuantity={this.updateItemQuantity} showModal={this.showModal} />
                <div className='external-container'>
                    <div className='justify-space'>
                        <span>SUBTOTAL</span>
                        <span>RM {this.renderTotal(this.state.cart)}</span>
                    </div>
                    {
                        this.state.shop_tax.map((tax_item, index) =>
                            <div className='justify-space' key={'tax_item-' + index}>
                                <span>{tax_item.name}</span>
                                <span>{tax_item.value}% - RM {this.renderPerTaxTotal(this.state.cart, tax_item.id)}</span>
                            </div>
                        )
                    }
                    <div className='justify-space'>
                        <span>TOTAL PAYMENT</span>
                        <span>RM {this.renderTotalNet(this.state.cart)}</span>
                    </div>
                    <Collapse>
                        <Panel header="Payment Method">
                            <li>
                                {
                                    this.state.payment_methods.map((method, index) =>
                                        <ul style={{ marginTop: '25px' }} key={'method-' + index}>
                                            <Checkbox disabled={!method.available} checked={this.state.selected_payment_method?.id === method.id} onChange={(event) => this.updatePaymentMethod(event)} style={{ marginRight: '5%' }} value={method} />
                                            <span>{method.description}</span>
                                        </ul>
                                    )
                                }
                            </li>
                        </Panel>
                    </Collapse>
                    <div className='justify-center'>
                        <div className='confirm-btn' style={{ backgroundColor: this.isValidOrder() ? null : 'grey' }} onClick={this.save}>
                            <span className='confirm-btn-title'>CONFIRM ORDER</span>
                        </div>
                    </div>
                </div>
                <CondimentModal
                    hideModal={this.hideModal}
                    visible={this.state.condimentsModalVisibility}
                    condiments={this.state.card_condiments}
                    current_item={this.state.current_item}
                    current_index={this.state.current_index}
                    dirtyItem={this.state.dirtyItem}

                    updateItemMethod={this.updateDirtyItemMethod}
                    updateItemCondiment={this.updateDirtyItemCondiment}
                    updateAddonText={this.updateAddonText}
                    isEdit={this.state.isEdit}
                    add={this.add}
                    edit={this.edit}
                />
                {/* error dialog */}
                <Modal title="Error" visible={this.state.error_message_visibility} cancelButtonProps={{ style: { display: 'none' } }} onOk={this.hideOnError}>
                    <p>{this.state.error_message}</p>
                </Modal>
                {/* success payment alert */}
                <SuccessPaymentAlert visible={this.state.success_payment_visibility} hide={this.hidePaymentSuccessAlert} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus, updateCart }

export default compose(
    withRouter,
    useParam,
    useLocation,
    connect(mapStateToProps, mapDispatchToProps)
)(Checkout);