import { Col, Row } from 'react-grid-system';
import NoImageAvailable from '../../../assets/images/no_image.png'
import React, { Component } from 'react';
import { Button, Badge, Divider } from 'antd';
import { IoBagHandleOutline } from 'react-icons/io5'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import TopBanners from '../../../components/topbanners/topbanners';
import CondimentModal from '../../../components/condimentmodal/condimentmodal';
import CheckoutButton from '../../../components/checkoutbutton/checkoutbutton';
import './menuitems.js';
import './menuitems.scoped.css'
import MenuItemsService from '../../../services/public/menuitemservice';
import StorageService from '../../../services/public/storageservice';
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { updateMenuCategory, updateSelectedCategory, updateMenuItem, updateCart } from '../../../app/stores/menu';
import { compose } from '@reduxjs/toolkit';
import { useParam } from '../../../components/useParam/useParam';
import { useLocation } from '../../../components/useLocation/useLocation';

class MenuItems extends Component {

    state = {
        outlet_id: null,
        userData: {
            email: '',
            phone: ''
        },
        cards: [],
        card_favorite: [],
        condimentsModalVisibility: false,
        current_item: null,
        card_condiments: [],
        cart: [],
        // modal: {
        //     condiments: [],
        //     addonText: '',
        //     isTakeout: false,
        //     quantity: null
        // },
        dirtyItem: {}
    }

    componentDidMount() {
        let outlet_id = this.props.params.outlet_id
        const storageService = new StorageService()
        const menuitemService = new MenuItemsService()
        menuitemService.index(outlet_id).then((response) => {
            let cards = response.data
            this.props.updateMenuItem(cards)
            this.props.updateMenuCategory(cards)
            this.props.updateSelectedCategory(cards[0].id)
            this.setState({ cards, outlet_id })
            this.props.updateLoadingStatus(false)
        })
        let cart = JSON.parse(storageService.retrieveInfo('cart'))
        if (cart) {
            this.props.updateCart(cart)
            this.setState({ cart })
        }
    }

    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    showItem = (current_item, card_condiments) => {
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
            available_condiments: [],
            condiments: [],
            addonText: '',
            isTakeout: false,
            quantity: 1
        } // reset form
        this.setState({ current_item, card_condiments, dirtyItem, condimentsModalVisibility })
    }
    hideModal = () => {
        let condimentsModalVisibility = false
        this.setState({ condimentsModalVisibility })
    }
    updateFavorite = (item, update) => {
        let current_card_favorite = this.state.card_favorite
        let card_favorite = []
        if (update) {
            card_favorite = [...current_card_favorite, item]
        } else {
            card_favorite = current_card_favorite.filter((c) => c.id !== item.id)
        }
        this.setState({ card_favorite })
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

    add = () => {
        let storageService = new StorageService()
        let currentCart = this.state.cart.filter((c) => true)
        let dirtyItem = { ...this.state.dirtyItem, available_condiments: this.state.card_condiments }
        let checkAndAddExistItem = this.checkAndAddExistItem(currentCart, dirtyItem)

        if (!checkAndAddExistItem) {
            let cart = [...this.state.cart, dirtyItem]
            this.setState({ cart })
            this.props.updateCart(cart)
            storageService.setInfo(['cart', JSON.stringify(cart)])
        } else {
            let cart = checkAndAddExistItem
            this.setState({ cart })
            this.props.updateCart(checkAndAddExistItem)
            storageService.setInfo(['cart', JSON.stringify(checkAndAddExistItem)])
        }

        let condimentsModalVisibility = false
        this.setState({ condimentsModalVisibility })
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

    render() {
        return (
            <div style={{ backgroundColor: 'rgb(238, 238, 238)' }}>
                {/* disable promotions for now :) */}
                {/* <TopBanners /> */}
                {
                    this.state.cards.map((c) => this.props.selected_category === c.id &&
                        <React.Fragment key={`cc-${c.id}`}>
                            <div className='gridbar'>
                                <span className='gridtitle'> {c.description} </span>
                                <Divider className='divider' type='horizontal'></Divider>
                            </div>
                            {
                                c.menu_brands && c.menu_brands.map((b) => <React.Fragment key={`bb-${b.id}`}>
                                    {
                                        !!b.menu_item.length && <React.Fragment>
                                            <div className="gridbar">
                                                <span className='gridsubtitle' id={`gsb-${b.id}`}> {b.description} </span>
                                            </div>
                                            <Row className='item-list-container'>
                                                {
                                                    b.menu_item.map((i) => <Col key={i.id} xs={6} md={6} lg={3} xxl={2} style={{ padding: '0px' }}>
                                                        <div className="item-container">
                                                            <Badge.Ribbon text="new !!" style={{ paddingRight: '20px', display: 'none' }}>
                                                                {/* <Skeleton.Image active={true} style={{display: this.checkImageLoadingStatus(i.id)? 'none':'block'}}></Skeleton.Image> */}
                                                                <img src={i.image? i.image:NoImageAvailable} className="item-box" id="item-box" alt='' />
                                                            </Badge.Ribbon>
                                                            <div className='item-description'>
                                                                <span className='item-description-title'>{i.name1}</span>
                                                                <span className='item-description-long'> {i.description} </span>
                                                                <div className='item-description-group'>
                                                                    <span className='item-description-subtitle'>MYR {i.price1}</span>
                                                                    <span className='item-description-group-icon'>
                                                                        {this.state.card_favorite.find((c) => c.id === i.id) ? <MdFavorite onClick={() => this.updateFavorite(i, false)} className='item-description-info' style={{ marginRight: '10px' }} /> : <MdOutlineFavoriteBorder onClick={() => this.updateFavorite(i, true)} className='item-description-info' style={{ marginRight: '10px' }} />}
                                                                        <AiOutlineInfoCircle className='item-description-info' />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Button onClick={() => this.showItem(i, b.condiment_item_menu_brand)} className='item-btn' type="primary">
                                                                <span>ADD</span>
                                                                <IoBagHandleOutline className='item-icon' />
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    )
                                                }
                                            </Row>
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                                )
                            }
                        </React.Fragment>
                    )
                }
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
                <CheckoutButton location={this.props.location} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading, selected_category: state.menu.selectedCategory, selected_sub_category: state.menu.selectedSubCategory })

const mapDispatchToProps = { updateLoadingStatus, updateMenuCategory, updateSelectedCategory, updateMenuItem, updateCart }

export default compose(
    useParam,
    useLocation,
    connect(mapStateToProps, mapDispatchToProps)
)(MenuItems);