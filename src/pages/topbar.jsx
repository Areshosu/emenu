import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';
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
        ]
    }
    render() {
        return (
            <Affix>
                <div className='top-bar-item-content' style={{backgroundColor: 'orange'}}>TABLE 29</div>
                  <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white'}}>
                <AlignLeftOutlined style={{fontSize: '50px', marginLeft: '15px'}}/>
                </div>
                <Row className='top-bar' wrap="nowrap" style={{backgroundColor: 'white'}}>
                {this.state.categories.map((i) =>
                    <Col className='top-bar-item' key={i.id} xs={3}>
                        <div className='top-bar-item-content'>{i.name}</div>
                    </Col>
                )}
            </Row>
            </Affix>
        );
    }
}

export default TopBar;