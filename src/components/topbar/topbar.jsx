import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.scoped.css';
import Search from 'antd/lib/input/Search';

class TopBar extends Component {
    state = {
        top_text_height: 'auto',
        subtop_text_height: 'auto',
        scroll_position: 0,
        big_image_size: {
            height: 80,
            width: 85
        },
        small_image_size: {
            height: 65,
            width: 65
        },
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

    // userinterface script
    selectCategory(category_id) {
        this.setState({ selected_category: category_id })
    }
    selectSubCategory(subcategory_id) {
        this.setState({ selected_sub_category: subcategory_id })
    }
    minimizetopbar() {
        let scroll_position = window.scrollY
        let big_image_size = {
            height: 80,
            width: 85
        }
        let small_image_size = {
            height: 65,
            width: 65
        }
        if (this.state.scroll_position < scroll_position) {
            big_image_size = {
                height: 0,
                width: 0
            }
            small_image_size = {
                height: 0,
                width: 0
            }
        }
        this.setState({big_image_size,small_image_size,scroll_position})
    }
    settopbaritemtextheight(doc) {
        let heighest_topbaritem_height_amongall = [...doc.querySelectorAll('.top-bar-scrollview .top-bar-item-content')].sort((a,b) => b.clientHeight - a.clientHeight)[0].clientHeight + 'px'
        let heighest_subtopbaritem_height_amongall = [...doc.querySelectorAll('.subtop-bar-scrollview .subtop-bar-item-content')].sort((a,b) => b.clientHeight - a.clientHeight)[0].clientHeight + 'px'
        if (window.innerWidth > 350 && window.innerWidth < 400) {
            heighest_topbaritem_height_amongall = 'auto'
            heighest_subtopbaritem_height_amongall = 'auto'
        }
        this.setState({top_text_height: heighest_topbaritem_height_amongall})

        // only change height when its not hidden
        if (heighest_subtopbaritem_height_amongall > 0) {
            this.setState({subtop_text_height: heighest_subtopbaritem_height_amongall})
        }
    }
    componentDidMount() {
        window.addEventListener('load', () => this.settopbaritemtextheight(document))
        window.addEventListener('resize', () => this.settopbaritemtextheight(document))
        window.addEventListener('scroll', (event) => this.minimizetopbar(event))
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
                            <Search type='primary' className='search-bar' placeholder='Search' enterButton color='#FF4500'></Search>
                            </Col>
                        </Row>
                    </div>
                    <Row className='top-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {this.state.categories.map((i) =>
                            <Col onClick={() => this.selectCategory(i.id)} onMouseOver={() => this.selectCategory(i.id)} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                                <div className='item-container' style={{backgroundImage: 'url(https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg)', height: `${this.state.big_image_size.height}px`, width: `${this.state.big_image_size.width}px`}}></div>
                                <div className='top-bar-item-content' style={{height: `${this.state.top_text_height}`}}>{i.name}</div>
                                <div className="bottom-indicator" style={{display: i.id === this.state.selected_category? 'block':'none'}}></div>
                            </Col>
                        )}
                    </Row>
                    <Row className='subtop-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white', display: this.state.selected_category ? 'flex' : 'none' }}>
                        {this.state.categories.map((i) =>
                            <Col onClick={() => this.selectSubCategory(i.id)} onMouseOver={() => this.selectSubCategory(i.id)} className='subtop-bar-item' key={i.id} xs={3} md={2} xl={1}>
                                <div className='item-container item-small' style={{backgroundImage: 'url(https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg)', height: `${this.state.small_image_size.height}px`, width: `${this.state.small_image_size.width}px` }}/>
                                <div className='subtop-bar-item-content' style={{height: `${this.state.subtop_text_height}`}}>{i.name}</div>
                                <div className="bottom-indicator" style={{display: i.id === this.state.selected_sub_category? 'block':'none'}}></div>
                            </Col>
                        )}
                    </Row>
                </div>
            </Affix>
        );
    }
}

export default TopBar;