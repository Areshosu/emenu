import { Col, Row } from 'react-grid-system';
import React, { Component } from 'react';
import { Button, Badge } from 'antd';
import './menuitems.css'
import TopBar from './topbar';

class MenuItems extends Component {
    state = {
        cards: [
            { id: 1, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 2, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 3, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 4, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 5, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 6, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
        ]
    }
    render() {
        return (
            <div>
                <TopBar/>
            <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                {
                    this.state.cards.map((i) => <Col key={i.id} xs={6} md={6} lg={3} style={{ padding: '0px' }}>
                    <div className="item-container">
                        <Badge.Ribbon text="New" color="orange" style={{paddingRight: '20px', display: i.id > 3? 'none' : 'block'}}>
                        <div className="item-box"></div>
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
            </div>
        );
    }
}

export default MenuItems;