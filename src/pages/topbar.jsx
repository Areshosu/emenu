import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import { AlignCenterOutlined } from '@ant-design/icons';
import './topbar.css'

class TopBar extends Component {
    state = {
        categories: [
            { id: 1, name: 'For you' },
            { id: 2, name: 'Yummy deals' },
            { id: 3, name: 'Value set meals' },
            { id: 4, name: 'Bread and toast' },
            { id: 5, name: 'Rice' },
            { id: 6, name: 'Noodles' },
            { id: 7, name: 'Dim sum' },
            { id: 8, name: 'Dessert series' },
            { id: 9, name: 'Beverages' },
            { id: 10, name: 'Meatless series' },
        ],
        selected_category: null
    }
    render() {
        return (
            <Affix>
                <div className='top-bar'>
                <div className='top-bar-item-content' style={{backgroundColor: 'orange'}}>TABLE 29</div>
                  <div style={{padding: '10px', display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
                <AlignCenterOutlined style={{fontSize: '50px', marginLeft: '15px'}}/>
                </div>
                <Row className='top-bar-scrollview' wrap="nowrap" style={{backgroundColor: 'white'}}>
                {this.state.categories.map((i) =>
                    <Col className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                        <div className='top-bar-item-content'>{i.name}</div>
                    </Col>
                )}
            </Row>
            <Row className='subtop-bar-scrollview' wrap="nowrap" style={{backgroundColor: 'white'}}>
                {this.state.categories.map((i) =>
                    <Col className='subtop-bar-item' key={i.id} xs={3} md={2} xl={1}>
                        <div className='subtop-bar-item-content'>{i.name}</div>
                    </Col>
                )}
            </Row>
                </div>
            </Affix>
        );
    }
}

export default TopBar;