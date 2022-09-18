import { Col, Row } from 'react-grid-system';
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
import { connect } from 'react-redux';
import { updateLoadingStatus } from '../../../app/stores/appstatus';
import { updateMenuCategory, updateSelectedCategory, updateMenuItem } from '../../../app/stores/menu';

class MenuItems extends Component {

    state = {
        cards: [],
        card_favorite: [],
        condimentsModalVisibility: false,
        current_item: null,
        card_condiments: []
    }

    componentDidMount() {
        const menuitemservice = new MenuItemsService()
        menuitemservice.index(16).then((response) => {
            let cards = response.data
            this.props.updateMenuItem(cards)
            this.props.updateMenuCategory(cards)
            this.props.updateSelectedCategory(cards[0].id)
            this.setState({ cards })
            this.props.updateLoadingStatus(false)
        })
    }
    componentWillUnmount() {
        this.props.updateLoadingStatus(true)
    }
    updateCondiment = (current_item,card_condiments) => {
        this.setState({ current_item,card_condiments })
        console.log(current_item)
    }
    triggerCondimentModal = (update) => {
        let condimentsModalVisibility = update
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

    render() {
        return (
            <div style={{ backgroundColor: 'rgb(238, 238, 238)' }}>
                <TopBanners />
                {
                    this.state.cards.map((c) => this.props.selected_category === c.id && <React.Fragment key={`cc-${c.id}`}>
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
                                                            <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" className="item-box" id="item-box" alt='' />
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
                                                        <Button onClick={() => {this.updateCondiment(i,b.condiment_item_menu_brand); this.triggerCondimentModal(true)}} className='item-btn' type="primary">
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
                    </React.Fragment>)
                }
                <CondimentModal handleVisibility={this.triggerCondimentModal} visible={this.state.condimentsModalVisibility} condiments={this.state.card_condiments} current_item={this.state.current_item}/>
                <CheckoutButton />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ isLoading: state.appstat.isLoading, selected_category: state.menu.selectedCategory, selected_sub_category: state.menu.selectedSubCategory })

const mapDispatchToProps = { updateLoadingStatus, updateMenuCategory, updateSelectedCategory, updateMenuItem }

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);