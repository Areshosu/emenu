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

class Checkout extends Component {
    state = {
        cards: [],
        condimentsModalVisibility: false,
        current_item: null,
        card_condiments: [],
        dirtyItem: {},
        cart: []
    }
    showModal = (current_item, card_condiments) => {
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
            addonText: '',
            isTakeout: false,
            quantity: 1
        } // reset form
        this.setState({ condimentsModalVisibility, dirtyItem, current_item, card_condiments })
    }
    hideModal = () => {
        let condimentsModalVisibility = false
        this.setState({ condimentsModalVisibility })
    }
    updateDirtyItemCondiment = (event) => {
        let condiment_item = event.target.value
        let current_condiments = this.state.dirtyItem.condiments
        if (event.target.checked) {
            current_condiments.push(condiment_item)
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


    render() {
        return (
            <React.Fragment>
                <Recommendation cards={this.state.cards} showModal={this.showModal}/>
                <OrderItems cart={this.state.cart} updateQuantity={this.updateItemQuantity} />
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
                <CondimentModal
                    hideModal={this.hideModal}
                    visible={this.state.condimentsModalVisibility}
                    condiments={this.state.card_condiments}
                    current_item={this.state.current_item}
                    dirtyItem={this.state.dirtyItem}

                    updateItemMethod={this.updateDirtyItemMethod}
                    updateItemCondiment={this.updateDirtyItemCondiment}
                    updateAddonText={this.updateAddonText}
                    add={this.add}
                />
            </React.Fragment>
        );
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
        let storageService = new StorageService()
        let currentCart = this.state.cart.filter((c) => true)
        let checkAndAddExistItem = this.checkAndAddExistItem(currentCart,this.state.dirtyItem)

        if (!checkAndAddExistItem) {
            let cart = [...this.state.cart,this.state.dirtyItem]
            this.setState({cart})
            this.props.updateCart(cart)
            storageService.setInfo(['cart',JSON.stringify(cart)])
        } else {
            let cart = checkAndAddExistItem
            this.setState({cart})
            this.props.updateCart(cart)
            storageService.setInfo(['cart',JSON.stringify(checkAndAddExistItem)])
        }

        let condimentsModalVisibility = false
        this.setState({ condimentsModalVisibility })
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
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading })

const mapDispatchToProps = { updateLoadingStatus, updateCart }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);