import { Col, Row } from 'react-grid-system';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLoadingStatus } from '../../app/stores/appstatus';
import { Button, Badge, Divider } from 'antd';
import { IoBagHandleOutline } from 'react-icons/io5'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import TopBanners from '../../components/topbanners/topbanners';
import CondimentModal from '../../components/condimentmodal/condimentmodal';
import CheckoutButton from '../../components/checkoutbutton/checkoutbutton';
import './menuitems.scoped.css'

function MenuItems() {

    const [cards] = useState(
        [
            { id: 1, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 2, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 3, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 4, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 5, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 6, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 7, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 8, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 9, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 10, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 11, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 13, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 14, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 15, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 16, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 17, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 18, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 19, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 20, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 21, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
            { id: 22, image_url: "https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" },
        ]
    );

    const [cardheight, setCardheight] = useState(null);
    const [condimentsModalVisibility, setCondimentsModalVisibility] = useState(false);

    const dispatch = useDispatch();


    const setcardsize = useCallback((d) => {
        let cardheight = (d.getElementById('item-box').getBoundingClientRect().width - 50)
        setCardheight(cardheight);
    },[])

    const resizeEvents = useCallback((d) => {
        //initial resize
        setcardsize(d)
        window.addEventListener('load', () => setcardsize(d))
        // resize onchange
        window.addEventListener('resize', () => setcardsize(d))
    }, [setcardsize])

    useEffect(() => {
        console.log('mounted')
        resizeEvents(document)
        let loading = setTimeout(() => {
            dispatch(updateLoadingStatus(false))
        }, 3000);

        return function cleanup() {
            clearTimeout(loading)
        }

    },[resizeEvents,dispatch])
    
    function triggerCondimentModal (update) {
        let condimentsModalVisibility = update
        setCondimentsModalVisibility(condimentsModalVisibility)
    }

        return (
            <div style={{ backgroundColor: 'rgb(238, 238, 238)' }}>
                <TopBanners />
                <div className='gridbar'>
                    <span className='gridtitle'> Burger </span>
                    <Divider className='divider' type='horizontal'></Divider>
                    <span className='gridsubtitle'> Combo Pack </span>
                </div>
                <Row className='item-list-container'>
                    {
                        cards.map((i) => <Col key={i.id} xs={6} md={6} lg={3} xxl={2} style={{ padding: '0px' }}>
                            <div className="item-container">
                                <Badge.Ribbon text="new !!" color="orange" style={{ paddingRight: '20px', display: i.id > 3 ? 'none' : 'block' }}>
                                    <div className="item-box" style={{ backgroundImage: `url(${i.image_url})`, height: `${cardheight}px` }} id="item-box"></div>
                                </Badge.Ribbon>
                                <div className='item-description'>
                                    <span className='item-description-title'>Food</span>
                                    <span className='item-description-long'> Saucy Tasty food </span>
                                    <div className='item-description-group'>
                                        <span className='item-description-subtitle'>MYR 11.70</span>
                                        <span className='item-description-group-icon'>
                                            <MdOutlineFavoriteBorder className='item-description-info' style={{ marginRight: '10px' }} />
                                            <AiOutlineInfoCircle className='item-description-info' />
                                        </span>
                                    </div>
                                </div>
                                <Button onClick={() => triggerCondimentModal(true)} className='item-btn' type='primary'>
                                    <span>ADD</span>
                                    <IoBagHandleOutline className='item-icon' />
                                </Button>
                            </div>
                        </Col>
                        )
                    }
                </Row>
                <CondimentModal handleVisibility={triggerCondimentModal} visible={condimentsModalVisibility}/>
                <CheckoutButton/>
            </div>
        );
}

export default MenuItems;