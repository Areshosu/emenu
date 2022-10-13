import React, { Component } from 'react';
import { Button } from 'antd';
import NoAvailableImage from '../../assets/images/no_image.png'
import './recommendation.scoped.css';

class Recommendation extends Component {
    state = {}
    render() {
        return (
            <div className='recommend-container'>
                <span className='recommend-text'>we also recommend these</span>
                <ul>
                    {
                        this.props.cards.map((c, i) =>
                            c.menubrand && c.menubrand.map((b) =>
                                b.menu_item.map((i) =>
                                    <li key={'item-' + i}>
                                        <div className='box-property'>
                                            <div className='box-group'>
                                                <img src={i.image? i.image:NoAvailableImage} className="item-box" id="item-box" alt='' />
                                            </div>
                                            <div className='box-group'>
                                                <div className='box-item-title'>{i.name1}</div>
                                                <div>RM {i.price1}</div>
                                                <div className='add-btn'>
                                                    <Button shape='round' type='primary' onClick={() => this.props.showModal(i, b.condiment_item_menu_brand)}>ADD +</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )

                            )

                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Recommendation;