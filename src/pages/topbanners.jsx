import React, { Component } from 'react';
import { Carousel } from 'antd';
import './topbanners.scoped.css'

class TopBanners extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                    <Carousel className='carousel-bar' autoplay dotPosition='right' style={{margin: '20px'}}>
                    <div><h3 className='carousel-item'>1</h3></div>
                    <div><h3 className='carousel-item'>2</h3></div>
                    <div><h3 className='carousel-item'>3</h3></div>
                    <div><h3 className='carousel-item'>4</h3></div>
                </Carousel>
            </React.Fragment>
        );
    }
}
 
export default TopBanners;