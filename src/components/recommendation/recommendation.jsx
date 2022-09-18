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
                        ((() => {
                            let li = [];
                            for (let i = 0; i < 5; i++) {
                                li.push(
                                    <li key={i + 1}>
                                        <div className='box-property'>
                                            <div className='box-group'>
                                                <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" className="item-box" id="item-box" alt='' />
                                            </div>
                                            <div className='box-group'>
                                                <div className='box-item-title'>Burger King</div>
                                                <div>RM 7.00</div>
                                                <div className='add-btn'>
                                                    <Button shape='round' type='primary'>ADD</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            return li;
                        })())
                    }
                </ul>
            </div>
        );
    }
}

export default Recommendation;