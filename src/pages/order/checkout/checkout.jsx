import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { Link } from 'react-router-dom';
import Recommendation from '../../../components/recommendation/recommendation';
import CondimentModal from '../../../components/condimentmodal/condimentmodal';
import OrderItems from '../../../components/order-items/order-items';
import './checkout.scoped.css';
import StorageService from '../../../services/public/storageservice';
import MenuItemsService from '../../../services/public/menuitemservice';
import { updateCart } from '../../../app/stores/menu';
import _ from 'lodash';

class Checkout extends Component {
    state = {
        isEdit: false,
        cards: [],
        condimentsModalVisibility: false,
        current_item: null,
        current_index: null,
        card_condiments: [],
        dirtyItem: {},
        cart: []
    }
    componentDidMount() {
        let outlet_id = window.location.href.split('/')[4]
        const menuitemService = new MenuItemsService()
        menuitemService.index(outlet_id).then((response) => {
            let cards = response.data.filter((c,i) => i === 0) // get first record as recommendation
            this.setState({ cards, outlet_id })
            this.props.updateLoadingStatus(false)
        })

        const storageService = new StorageService()
        let cart = JSON.parse(storageService.retrieveInfo('cart'))
        this.setState({ cart })
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
                price3: current_item.price3
            },
            condiments: [],
            available_condiments: [],
            addonText: '',
            isTakeout: false,
            quantity: 1
        } // reset form
        if (oldDirtyItem) {
            isEdit = true
            dirtyItem = {...oldDirtyItem}
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
    updateDirtyItemCondiment = (event) => {
        let condiment_item = event.target.value
        let current_condiments = this.state.dirtyItem.condiments
        if (event.target.checked) {
            current_condiments = [...current_condiments,condiment_item]
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
            cart.splice(index,1)
        }

        this.setState({ cart })

        const storageService = new StorageService()
        storageService.setInfo(['cart', JSON.stringify(cart)])
    }

    add = () => {
        let condimentsModalVisibility = false
        let storageService = new StorageService()
        let currentCart = this.state.cart.filter((c) => true)
        let dirtyItem = {...this.state.dirtyItem,available_condiments: this.state.card_condiments}
        let checkAndAddExistItem = this.checkAndAddExistItem(currentCart,dirtyItem)

            let cart = checkAndAddExistItem? checkAndAddExistItem : [...currentCart,dirtyItem] 
            storageService.setInfo(['cart',JSON.stringify(cart)])

        this.setState({ condimentsModalVisibility, cart })
    }

    edit = (index) => {
        console.log(index)
        let storageService = new StorageService()
        let cart = this.state.cart.filter((c) => true)

            cart[index] = {...this.state.dirtyItem}
            this.setState({cart})
            this.props.updateCart(cart)

        let condimentsModalVisibility = false
        this.setState({ cart,condimentsModalVisibility })
        storageService.setInfo(['cart',JSON.stringify(cart)])
    }

    checkAndAddExistItem = (cart,item) => {
        let cartItem = cart.find((c) => {
            let c1 = JSON.stringify(c.item) === JSON.stringify(item.item)
            let c2 = JSON.stringify(c.condiments) === JSON.stringify(item.condiments)
            let c3 = c.isTakeout === item.isTakeout
            let c4 = c.addonText === item.addonText
            return c1 && c2 && c3 && c4
        })
        let cartItemIndex = cart.indexOf(cartItem)
        if (cartItemIndex > -1) {
        cart[cartItemIndex] = {...cartItem,quantity: cartItem.quantity + 1}
        return cart
        }
    }

    renderTotal (carts) {
        let total = 0
        carts.forEach((cart) => {
            let itemPrice = Number(cart.item.price1)
            let condimentsPrice = Number(_.sum(_.pluck(cart.condiments,'amount')))
            total += (itemPrice + condimentsPrice) * cart.quantity
        })
        let tax = (total / 100) * 2 // TAX
        return _.round(total + tax,2)
    }

    render() {
        return (
            <React.Fragment>
                <Recommendation cards={this.state.cards} showModal={this.showModal}/>
                <OrderItems cart={this.state.cart} updateQuantity={this.updateItemQuantity} showModal={this.showModal}/>
                <div className='external-container'>
                    <div className='justify-space'>
                        <span>TAX</span>
                        <span>2%</span>
                    </div>
                    <div className='justify-space'>
                        <span>TOTAL PAYMENT</span>
                        <span>RM {this.renderTotal(this.state.cart)}</span>
                    </div>
                    <div className='justify-center'>
                        <Link className='confirm-btn' to="/order/checkout">
                            <span className='confirm-btn-title'>CONFIRM ORDER</span>
                        </Link>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus, updateCart }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);