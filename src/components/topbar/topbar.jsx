import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.js';
import './topbar.scoped.css';
import { Input, AutoComplete } from 'antd'
import { updateSelectedCategory, updateSelectedSubCategory } from '../../app/stores/menu.js';
import { connect } from 'react-redux/es/exports.js';
const { Search } = Input;

class TopBar extends Component {
    state = {
        categories: [],
        selected_category: null,
        selected_sub_category: null,
        search_autocomplete_option: []
    }

    // // userinterface script
    selectCategory = (selected_category,option) => {
        if (option) {
            this.props.updateSelectedCategory(selected_category)
        }
        this.setState({selected_category})
    }
    selectSubCategory = (selected_sub_category,option) => {
        if (option) {
            this.props.updateSelectedSubCategory(selected_sub_category)
            window.location = `#gsb-${selected_sub_category}`
        }
        this.setState({ selected_sub_category })
    }
    getCategories = () => {
        return this.props.menuCategories
    }
    getSubcategories = () => {
        let category = this.props.menuCategories.find((c) => c.id === this.state.selected_category)
        return category? category.subcategories : []
    }
    handleSearchAutoComplete = (query) => {
        let menubrand_item = this.props.menuItem
        let list_of_menu_items = []
        menubrand_item.forEach((c) => c.menu_brands.forEach((b,i) => Array.prototype.push.apply(list_of_menu_items,b.menu_item)))
        let search_autocomplete_option = list_of_menu_items.filter((i) => i.description.toLowerCase().includes(query))
        search_autocomplete_option = search_autocomplete_option.map((s) => ({label: s.description,value: s.description}))
        this.setState({search_autocomplete_option})
    }
    handleSearchDialog = () => {
        console.log('ouhh stinkyy!')
    }
    render() {
        return (
            <Affix>
                <div className='top-bar'>
                    <div className='top-bar-item-content top-bar-table'>TABLE 29</div>
                    <div className='top-bar-wrapper'>
                        <Row className='upper-bar'>
                            <Col xs={12} md={6}>
                                <div className='upper-bar-item'>PACOM RESTAURANT</div>
                            </Col>
                            <Col>
                                <AutoComplete className='search-bar' onSearch={this.handleSearchAutoComplete} options={this.state.search_autocomplete_option} onSelect={this.handleSearchDialog}>
                                <Search placeholder='Search' enterButton color='#FF4500'></Search>
                                </AutoComplete>
                            </Col>
                        </Row>
                    </div>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {this.getCategories().map((i) =>
                            <Col onClick={() => this.selectCategory(i.id,true)} className='top-bar-item' key={i.id} xs={5} md={4} xl={3}>
                                <div className='item-container bar-item-hover'>
                                    <img className='item-img' src="https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg" alt="foodimg.png" />
                                </div>
                                <div className='top-bar-item-content'>{i.name}</div>
                                <div className="bottom-indicator" style={{ display: i.id === this.state.selected_category ? 'block' : 'none' }}></div>
                            </Col>
                        )}
                    </Row>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white', display: this.state.selected_category ? 'flex' : 'none' }}>
                        {this.getSubcategories().map((i) =>
                            <Col onClick={() => this.selectSubCategory(i.id,true)} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
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

const mapStateToProps = (state) => ({menuItem: state.menu.menuItem,menuCategories: state.menu.menuCategory})

const mapDispatchToProps = {updateSelectedCategory,updateSelectedSubCategory}

export default connect(mapStateToProps,mapDispatchToProps)(TopBar);