import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.js';
import './topbar.scoped.css';
import NoAvailableImage from '../../assets/images/no_image_mini.png'
import { Input, AutoComplete } from 'antd'
import { updateSelectedCategory, updateSelectedSubCategory } from '../../app/stores/menu.js';
import { connect } from 'react-redux/es/exports.js';
import AuthenticationService from '../../services/public/authenticationservice.js';
const { Search } = Input;

class TopBar extends Component {
    state = {
        outlet: {
            name: '',
            location: '',
            city: ''
        },
        table_id: null,
        categories: [],
        selected_category: null,
        selected_sub_category: null,
        search_autocomplete_option: []
    }
    componentDidMount = () => {
        const authService = new AuthenticationService();
        let outlet = JSON.parse(authService.retrieveInfo('outlet'));
        let table_id = JSON.parse(authService.retrieveInfo('table_id'))
        this.setState({ outlet, table_id })
    }

    // // userinterface script
    selectCategory = (selected_category, option) => {
        if (option) {
            this.props.updateSelectedCategory(selected_category)
        }
        this.setState({ selected_category })
        window.scrollTo({top: 0})
    }
    selectSubCategory = (selected_sub_category, option) => {
        if (option) {
            this.props.updateSelectedSubCategory(selected_sub_category)
            let offset = document.getElementById(`gsb-${selected_sub_category}`).offsetTop
            window.scrollTo({top: offset - 370})
        }
        this.setState({ selected_sub_category })
    }
    getCategories = () => {
        return this.props.menuCategories
    }
    getSubcategories = () => {
        let category = this.props.menuCategories.find((c) => c.id === this.state.selected_category)
        return category ? category.subcategories : []
    }
    handleSearchAutoComplete = (query) => {
        let menubrand_item = this.props.menuItem
        let list_of_menu_items = []
        menubrand_item.forEach((c) => c.menubrand.forEach((b, i) => Array.prototype.push.apply(list_of_menu_items, b.menu_item)))
        let search_autocomplete_option = list_of_menu_items.filter((i) => i.description.toLowerCase().includes(query))
        search_autocomplete_option = search_autocomplete_option.map((s) => ({ label: s.description, value: s.description,key: s.id }))
        this.setState({ search_autocomplete_option })
    }
    handleSearch = () => {
        
    }
    render() {
        return (
            this.state.outlet && <Affix>
                <div className='top-bar'>
                    <div className='top-bar-item-content top-bar-table'>TABLE # {this.state.table_id}</div>
                    <div className='top-bar-wrapper'>
                        <Row className='upper-bar'>
                            <Col xs={12} md={6}>
                                <div className='upper-bar-item'>{this.state.outlet.name} - {this.state.outlet.city}</div>
                            </Col>
                            {/* <Col>
                                <AutoComplete className='search-bar' onSearch={this.handleSearchAutoComplete} options={this.state.search_autocomplete_option}>
                                    <Search placeholder='Search' enterButton onSearch={(value) => this.handleSearch(value)}></Search>
                                </AutoComplete>
                            </Col> */}
                        </Row>
                    </div>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {this.getCategories().map((i) =>
                            <Col onClick={() => this.selectCategory(i.id, true)} className='top-bar-item' key={i.id} xs={5} md={4} xl={3}>
                                <div className='item-container bar-item-hover'>
                                    <img className='item-img' src={i.image? i.image:NoAvailableImage} alt="foodimg.png" />
                                </div>
                                <div className='top-bar-item-content'>{i.name}</div>
                                <div className="bottom-indicator" style={{ display: i.id === this.state.selected_category ? 'block' : 'none' }}></div>
                            </Col>
                        )}
                    </Row>
                    <Row className='top-bar-scrollview primary-bar' wrap="nowrap" style={{ backgroundColor: 'white', display: this.state.selected_category ? 'flex' : 'none' }}>
                        {this.getSubcategories().map((i) =>
                            <Col onClick={() => this.selectSubCategory(i.id, true)} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                                <div className='item-container bar-item-hover item-small'>
                                    <img className='item-img' src={i.image? i.image:NoAvailableImage} alt="foodimg.png" />
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

const mapStateToProps = (state) => ({ menuItem: state.menu.menuItem, menuCategories: state.menu.menuCategory })

const mapDispatchToProps = { updateSelectedCategory, updateSelectedSubCategory }

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);