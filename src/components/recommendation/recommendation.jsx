import React, { Component } from 'react';
import { Button } from 'antd';
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
                            c.menu_brands && c.menu_brands.map((b) =>
                                b.menu_item.map((i) =>
                                    <li key={'item-' + i}>
                                        <div className='box-property'>
                                            <div className='box-group'>
                                                <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" className="item-box" id="item-box" alt='' />
                                            </div>
                                            <div className='box-group'>
                                                <div className='box-item-title'>{i.name1}</div>
                                                <div>RM {i.price1}</div>
                                                <div className='add-btn'>
                                                    <Button shape='round' type='primary' onClick={() => this.props.showModal(i,b.condiment_item_menu_brand)}>ADD +</Button>
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