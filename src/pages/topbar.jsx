import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.css'
import Search from 'antd/lib/input/Search';

class TopBar extends Component {
    state = {
        screen_height: null,
        screen_width: null,
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

    selectCategory(category_id) {
        this.setState({ selected_category: category_id })
    }
    rerenderUI() {
        let screen_height = window.innerHeight
        let screen_width = window.innerWidth
        this.setState({ screen_height, screen_width })
    }
    componentDidMount() {
        window.addEventListener('load', () => this.rerenderUI())
        window.addEventListener('resize', () => this.rerenderUI())


    }
    render() {
        return (
            <Affix>
                <div className='top-bar'>
                    <div className='top-bar-item-content' style={{ backgroundColor: 'orange' }}>TABLE 29</div>
                    <div style={{ padding: '10px', display: 'flex', justifyContent: this.state.screen_width > 1080 ? 'space-between' : 'center', backgroundColor: 'white' }}>
                        <Row className='upper-bar'>
                            <Col xs={12} md={6}>
                            <div className='upper-bar-item'>PACOM RESTAURANT</div>
                            </Col>
                            <Col>
                            <Search className='search-bar' placeholder='Search' enterButton color='#FF4500'></Search>
                            </Col>
                        </Row>
                    </div>
                    <Row className='top-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {this.state.categories.map((i) =>
                            <Col onClick={() => this.selectCategory('asd')} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                                <div className='top-bar-item-content'>{i.name}</div>
                            </Col>
                        )}
                    </Row>
                    <Row className='subtop-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white', display: this.state.selected_category ? 'flex' : 'none' }}>
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