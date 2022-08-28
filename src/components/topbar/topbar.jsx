import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { Affix } from 'antd';
import './topbar.scoped.css';
import Search from 'antd/lib/input/Search';

function TopBar() {
    const [top_text_height,setTop_text_height] = useState('auto')
    const [subtop_text_height,setSubtop_text_height] = useState('auto')
    const [scroll_position_root,setScroll_position_root] = useState(0)
    const [big_image_size,setBig_image_size] = useState({
        big_image_size: {
            height: 80,
            width: 85
        }
    })
    const [small_image_size,setSmall_image_size] = useState({
        small_image_size: {
            height: 65,
            width: 65
        }
    })
    const [categories] = useState([
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
    ])
    const [selected_category,setSelected_category] = useState(null)
    const [selected_sub_category,setSelected_sub_category] = useState(null)

    // userinterface script
    const selectCategory = (category_id) => {
        setSelected_category(category_id)
    }
    const selectSubCategory = (subcategory_id) => {
        setSelected_sub_category(subcategory_id)
    }
    const minimizetopbar = useCallback(() => {
        let scroll_position = window.scrollY
        let big_image_size = {
            height: 80,
            width: 85
        }
        let small_image_size = {
            height: 65,
            width: 65
        }
        if (scroll_position_root < scroll_position) {
            big_image_size = {
                height: 0,
                width: 0
            }
            small_image_size = {
                height: 0,
                width: 0
            }
        }

        setBig_image_size(big_image_size); setSmall_image_size(small_image_size); setScroll_position_root(scroll_position)
    },[scroll_position_root])
    const settopbaritemtextheight = useCallback((doc) => {
        let heighest_topbaritem_height_amongall = [...doc.querySelectorAll('.top-bar-scrollview .top-bar-item-content')].sort((a,b) => b.clientHeight - a.clientHeight)[0].clientHeight + 'px'
        let heighest_subtopbaritem_height_amongall = [...doc.querySelectorAll('.subtop-bar-scrollview .subtop-bar-item-content')].sort((a,b) => b.clientHeight - a.clientHeight)[0].clientHeight + 'px'
        if (window.innerWidth > 350 && window.innerWidth < 400) {
            heighest_topbaritem_height_amongall = 'auto'
            heighest_subtopbaritem_height_amongall = 'auto'
        }
            setTop_text_height(heighest_topbaritem_height_amongall)

        // only change height when its not hidden
        if (heighest_subtopbaritem_height_amongall > 0) {
            setSubtop_text_height(heighest_subtopbaritem_height_amongall)
        }
    },[])
    useEffect(() => {
        window.addEventListener('load', () => settopbaritemtextheight(document))
        window.addEventListener('resize', () => settopbaritemtextheight(document))
        window.addEventListener('scroll', (event) => minimizetopbar(event))
    },[settopbaritemtextheight,minimizetopbar])
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
                    <Row className='top-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white' }}>
                        {categories.map((i) =>
                            <Col onClick={() => selectCategory(i.id)} onMouseOver={() => selectCategory(i.id)} className='top-bar-item' key={i.id} xs={4} md={3} xl={2}>
                                <div className='item-container' style={{backgroundImage: 'url(https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg)', height: `${big_image_size.height}px`, width: `${big_image_size.width}px`}}></div>
                                <div className='top-bar-item-content' style={{height: `${top_text_height}`}}>{i.name}</div>
                                <div className="bottom-indicator" style={{display: i.id === selected_category? 'block':'none'}}></div>
                            </Col>
                        )}
                    </Row>
                    <Row className='subtop-bar-scrollview' wrap="nowrap" style={{ backgroundColor: 'white', display: selected_category ? 'flex' : 'none' }}>
                        {categories.map((i) =>
                            <Col onClick={() => selectSubCategory(i.id)} onMouseOver={() => selectSubCategory(i.id)} className='subtop-bar-item' key={i.id} xs={3} md={2} xl={1}>
                                <div className='item-container item-small' style={{backgroundImage: 'url(https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg)', height: `${small_image_size.height}px`, width: `${small_image_size.width}px` }}/>
                                <div className='subtop-bar-item-content' style={{height: `${subtop_text_height}`}}>{i.name}</div>
                                <div className="bottom-indicator" style={{display: i.id === selected_sub_category? 'block':'none'}}></div>
                            </Col>
                        )}
                    </Row>
                </div>
            </Affix>
        );
}

export default TopBar;