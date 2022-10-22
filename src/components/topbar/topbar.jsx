import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.js';
import './topbar.scoped.css';
import NoAvailableImage from '../../assets/images/no_image_mini.png'
// import { Input } from 'antd'
import { updateSideBarVisibility } from '../../app/stores/appstatus.js';
import { updateSelectedCategory, updateSelectedSubCategory } from '../../app/stores/menu.js';
import { connect } from 'react-redux/es/exports.js';
import AuthenticationService from '../../services/public/authenticationservice.js';
import { CgDetailsMore } from 'react-icons/cg';
// const { Search } = Input;

class TopBar extends Component {
    state = {
        outlet: {
            name: '',
            location: '',
            city: ''
        },
        table: null,
        categories: [],
        selected_category: null,
        selected_sub_category: null,
        search_autocomplete_option: []
    }
    componentDidMount = () => {
        const authService = new AuthenticationService();
        let outlet = JSON.parse(authService.retrieveInfo('outlet'));
        let table = JSON.parse(authService.retrieveInfo('table'))
        this.setState({ outlet, table })
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
                    <div className='top-bar-item-content top-bar-table'>{this.state.table?.description}</div>
                    <div className='top-bar-wrapper'>
                        <Row className='upper-bar'>
                                <Col md={1} className='sidebar-btn upper-bar-item' id='sidebar-btn-itm'>{<CgDetailsMore onClick={() => this.props.updateSideBarVisibility(true)}/>}</Col>
                                <Col className='upper-bar-item'>{this.state.outlet.name} - {this.state.outlet.city}</Col>
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
                                    <img className='item-img' src={i.image? `${process.env.REACT_APP_BACKEND_URL}/uploads/menu-categories/${i.image}`:NoAvailableImage} alt="foodimg.png" />
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
                                    <img className='item-img' src={i.image? `${process.env.REACT_APP_BACKEND_URL}/uploads/menu-brands/${i.image}`:NoAvailableImage} alt="foodimg.png" />
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

const mapStateToProps = (state) => ({ menuItem: state.menu.menuItem, menuCategories: state.menu.menuCategory, sidebarVisibility: state.appstat.sidebarVisibility })

const mapDispatchToProps = { updateSelectedCategory, updateSelectedSubCategory, updateSideBarVisibility }

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);