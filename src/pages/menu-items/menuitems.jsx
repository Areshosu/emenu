import { Col, Row } from 'react-grid-system';
import React, { Component } from 'react';
import { Button, Badge, Divider, Skeleton } from 'antd';
import { IoBagHandleOutline } from 'react-icons/io5'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import TopBanners from '../../components/topbanners/topbanners';
import CondimentModal from '../../components/condimentmodal/condimentmodal';
import CheckoutButton from '../../components/checkoutbutton/checkoutbutton';
import './menuitems.js';
import './menuitems.scoped.css'
import MenuItemsService from '../../services/public/menuitemservice';

class MenuItems extends Component {

    state = {
        cards: [
            { id: 1, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 2, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 3, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 4, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 5, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 6, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 7, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 8, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 9, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 10, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 11, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 13, image_url: "https://c8.alamy.com/comp/TRGKYT/penguin-highway-2018-directed-by-hiroyasu-ishida-and-starring-kana-kita-y-aoi-landen-beattie-and-miki-fukui-impressive-anime-adaptation-of-tomihiko-morimis-magical-fantasy-novel-about-the-mysterious-appearance-of-penguins-in-a-village-TRGKYT.jpg" },
            { id: 14, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 15, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 16, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 17, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 18, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 19, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 20, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 21, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 22, image_url: "" },
        ],
        card_favorite: [],
        condimentsModalVisibility: false
    }

    componentDidMount() {
        const menuitemservice = new MenuItemsService()
        menuitemservice.index(16).then((response) => {
            let cards = response.data
            console.log(cards)
            this.setState({ cards })
        })
    }

    triggerCondimentModal = (update) => {
        let condimentsModalVisibility = update
        this.setState({ condimentsModalVisibility })
    }
    updateFavorite = (item,update) => {
        let current_card_favorite = this.state.card_favorite
        let card_favorite = []
        if (update) {
            card_favorite = [...current_card_favorite,item]
        console.log(card_favorite)
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
                    this.state.cards.map((c) => <React.Fragment key={`cc-${c.id}`}>
                        <div className='gridbar'>
                            <span className='gridtitle'> {c.description} </span>
                            <Divider className='divider' type='horizontal'></Divider>
                        </div>
                        {
                            c.menu_brands && c.menu_brands.map((b) => <React.Fragment key={`bb-${b.id}`}>
                            <div className="gridbar">
                                <span className='gridsubtitle'> {b.description} </span>
                            </div>
                            <Row className='item-list-container'>
                                {
                                    b.menu_item.length > 0? b.menu_item.map((i) => <Col key={i.id} xs={6} md={6} lg={3} xxl={2} style={{ padding: '0px' }}>
                                        <div className="item-container">
                                            <Badge.Ribbon text="new !!" color="orange" style={{ paddingRight: '20px', display: i.id > 3 ? 'none' : 'block' }}>
                                                {/* <Skeleton.Image active={true} style={{display: this.checkImageLoadingStatus(i.id)? 'none':'block'}}></Skeleton.Image> */}
                                                <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" className="item-box" id="item-box" alt='' />
                                            </Badge.Ribbon>
                                            <div className='item-description'>
                                                <span className='item-description-title'>{i.name1}</span>
                                                <span className='item-description-long'> {i.description} </span>
                                                <div className='item-description-group'>
                                                    <span className='item-description-subtitle'>MYR {i.price1}</span>
                                                    <span className='item-description-group-icon'>
                                                        { this.state.card_favorite.find((c) => c.id === i.id)? <MdFavorite onClick={() => this.updateFavorite(i,false)} className='item-description-info' style={{ marginRight: '10px' }} /> : <MdOutlineFavoriteBorder onClick={() => this.updateFavorite(i,true)} className='item-description-info' style={{ marginRight: '10px' }} /> }
                                                        <AiOutlineInfoCircle className='item-description-info' />
                                                    </span>
                                                </div>
                                            </div>
                                            <Button onClick={() => this.triggerCondimentModal(true)} className='item-btn' type='primary'>
                                                <span>ADD</span>
                                                <IoBagHandleOutline className='item-icon' />
                                            </Button>
                                        </div>
                                    </Col>
                                    ) : <span> No item to show </span>
                                }
                            </Row>
                        </React.Fragment>
                        )
                        }
                    </React.Fragment>)
                }
                <CondimentModal handleVisibility={this.triggerCondimentModal} visible={this.state.condimentsModalVisibility} />
                <CheckoutButton />
            </div>
        );
    }
}

export default MenuItems;