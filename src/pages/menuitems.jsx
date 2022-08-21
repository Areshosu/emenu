import { Col, Row } from 'react-grid-system';
import React, { Component } from 'react';
import { Button, Badge, Divider } from 'antd';
import './menuitems.css'

class MenuItems extends Component {
    state = {
        cards: [
            { id: 1, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 2, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 3, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 4, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 5, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 6, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
        ],
        cardheight: null,
        titlesize: null
    }
    setcardsize(d) {
        let cardheight = (d.getElementById('item-box').getBoundingClientRect().width + 5)
        this.setState({ cardheight })
    }
    componentDidMount() {
        console.log('mounted')
        window.addEventListener('load', () => this.setcardsize(document))
        window.addEventListener('resize', () => this.setcardsize(document))
    }

    render() {
        return (
            <React.Fragment>
                <div className='gridbar'>
                    <span className='gridtitle'> Burger </span>
                    <Divider className='divider' type='horizontal'></Divider>
                    <span className='gridsubtitle'> Combo Pack </span>
                </div>
                <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    {
                        this.state.cards.map((i) => <Col key={i.id} xs={6} md={6} lg={3} xxl={2} style={{ padding: '0px' }}>
                            <div className="item-container">
                                <Badge.Ribbon text="New" color="orange" style={{ paddingRight: '20px', display: i.id > 3 ? 'none' : 'block' }}>
                                    <div className="item-box" style={{ backgroundImage: `url(${i.image_url})`, height: `${this.state.cardheight}px` }} id="item-box"></div>
                                </Badge.Ribbon>
                                <div className='item-description'>
                                    <div>Food</div>
                                    <div>MYR 17.70</div>
                                </div>
                                <Button className='item-btn' type='primary' shape='round'>ADD +</Button>
                            </div>
                        </Col>
                        )
                    }
                </Row>
            </React.Fragment>
        );
    }
}

export default MenuItems;