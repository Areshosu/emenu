import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.js';
import './topbar.scoped.css';
import Search from 'antd/lib/input/Search';

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
        selected_category: null,
        selected_sub_category: null
    }

    // // userinterface script
    selectCategory = (selected_category) => {
        this.setState({ selected_category })
    }
    selectSubCategory = (selected_sub_category) => {
        this.setState({ selected_sub_category })
    }

    componentDidMount() {
    }
    render() {
        return (
            <Affix>
                <div className='top-bar'>
                    <div className='top-bar-item-content' style={{ backgroundColor: 'orange' }}>TABLE 29</div>
                    <div style={{ padding: '10px', display: 'flex', backgroundColor: 'white' }}>
                        <Row className='upper-bar'>
                            <Col xs={12} md={6}>
                                <div className='upper-bar-item'>PACOM RESTAURANT</div>
                            </Col>
                            <Col>
                                <Search type='primary' className='search-bar' placeholder='Search' enterButton color='#FF4500'></Search>
                            </Col>
                        </Row>
                    </div>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {this.state.categories.map((i) =>
                            <Col onClick={() => this.selectCategory(i.id)} onMouseOver={() => this.selectCategory(i.id)} className='top-bar-item' key={i.id} xs={5} md={4} xl={3}>
                                <div className='item-container bar-item-hover'>
                                    <img className='item-img' src="https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg" alt="foodimg.png" />
                                </div>
                                <div className='top-bar-item-content'>{i.name}</div>
                                <div className="bottom-indicator" style={{ display: i.id === this.state.selected_category ? 'block' : 'none' }}></div>
                            </Col>
                        )}
                    </Row>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white', display: this.state.selected_category ? 'flex' : 'none' }}>
                        {this.state.categories.map((i) =>
                            <Col onClick={() => this.selectSubCategory(i.id)} onMouseOver={() => this.selectSubCategory(i.id)} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                                <div className='item-container bar-item-hover item-small'>
                                    <img className='item-img' src="https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg" alt="foodimg.png" />
                                </div>
                                <div className='top-bar-item-content small-font'>{i.name}</div>
                                <div className="bottom-indicator" style={{ display: i.id === this.state.selected_sub_category ? 'block' : 'none' }}></div>
                            </Col>
                        )}
                    </Row>
                </div>
            </Affix>
        );
    }
}

export default TopBar;