import { Col, Row } from 'react-grid-system';
import React, { Component } from 'react';
import { Button, Badge, Divider } from 'antd';
import { IoBagHandleOutline } from 'react-icons/io5'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import TopBanners from './topbanners';
import CondimentModel from '../components/condimentmodal';
import CheckoutButton from '../components/checkoutbutton';
import './menuitems.scoped.css'

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
            { id: 13, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 14, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 15, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 16, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 17, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 18, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 19, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 20, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 21, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 22, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
        ],
        cardheight: null,
        condimentsModalVisibility: false,
    }
    setcardsize(d) {
        let cardheight = (d.getElementById('item-box').getBoundingClientRect().width - 50)
        this.setState({ cardheight })
    }
    componentDidMount() {
        console.log('mounted')
        window.addEventListener('load', () => this.setcardsize(document))
        window.addEventListener('resize', () => this.setcardsize(document))
    }
    triggerCondimentModal = () => {
        let condimentsModalVisibility = !this.state.condimentsModalVisibility
        this.setState({condimentsModalVisibility})
    }

    render() {
        return (
            <div style={{ backgroundColor: 'rgb(238, 238, 238)' }}>
                <TopBanners />
                <div className='gridbar'>
                    <span className='gridtitle'> Burger </span>
                    <Divider className='divider' type='horizontal'></Divider>
                    <span className='gridsubtitle'> Combo Pack </span>
                </div>
                <Row className='item-list-container'>
                    {
                        this.state.cards.map((i) => <Col key={i.id} xs={6} md={6} lg={3} xxl={2} style={{ padding: '0px' }}>
                            <div className="item-container">
                                <Badge.Ribbon text="new !!" color="orange" style={{ paddingRight: '20px', display: i.id > 3 ? 'none' : 'block' }}>
                                    <div className="item-box" style={{ backgroundImage: `url(${i.image_url})`, height: `${this.state.cardheight}px` }} id="item-box"></div>
                                </Badge.Ribbon>
                                <div className='item-description'>
                                    <span className='item-description-title'>Food</span>
                                    <span className='item-description-long'> Saucy Tasty food </span>
                                    <div className='item-description-group'>
                                        <span className='item-description-subtitle'>MYR 11.70</span>
                                        <span className='item-description-group-icon'>
                                            <MdOutlineFavoriteBorder className='item-description-info' style={{ marginRight: '10px' }} />
                                            <AiOutlineInfoCircle className='item-description-info' />
                                        </span>
                                    </div>
                                </div>
                                <Button onClick={() => this.triggerCondimentModal()} className='item-btn' type='primary' shape='round'>
                                    <span>ADD</span>
                                    <IoBagHandleOutline className='item-icon' />
                                </Button>
                            </div>
                        </Col>
                        )
                    }
                </Row>
                <CondimentModel handleVisibility={this.triggerCondimentModal} visible={this.state.condimentsModalVisibility}/>
                <CheckoutButton/>
            </div>
        );
    }
}

export default MenuItems;