import React from 'react';
import './condimentmodal.scoped.css'
import { Modal, Collapse, Button, Checkbox, Input } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io'
const { Panel } = Collapse;
const { TextArea } = Input;

function CondimentModal(props) {
    return (
        <Modal className='condiment-modal' title={props.current_item && props.current_item.description} onCancel={() => props.hideModal()} visible={props.visible} style={{ bottom: 10 }} bodyStyle={{ overflowY: 'scroll' }} footer={null}>
            <div>
                <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" className="item-box" id="item-box" alt='' />
            </div>
            <Collapse defaultActiveKey={[2, 3]} expandIconPosition='end'>
                <Panel header="Select Add-ons" key="1">
                    <li>
                        {
                            props.condiments.map((con) => con.condiment_item &&
                                <a href='#/' key={`con-${con.condiment_item_id}`} style={{ display: 'flex' }}>
                                        <Checkbox checked={props.dirtyItem.condiments.find((i) => i.id === con.condiment_item_id)} onChange={(e) => props.updateItemCondiment(e)} value={con.condiment_item}> {con.condiment_item.description} </Checkbox>
                                    <span className='item-decoration item-price'> + RM {con.condiment_item.amount}</span>
                                </a>)
                        }
                    </li>
                </Panel>
                <Panel header="Order takeout" key="2">
                    <li>
                        <a href='#/' style={{ display: 'flex' }}>
                            <Checkbox checked={!props.dirtyItem.isTakeout} key='m1' onClick={() => props.updateItemMethod(false)}> Dine in </Checkbox>
                            <span className='item-decoration item-price'> + RM 0.00</span>
                        </a>
                        <a href='#/' style={{ display: 'flex' }}>
                            <Checkbox checked={props.dirtyItem.isTakeout} key='m2' onClick={() => props.updateItemMethod(true)}> Take out </Checkbox>
                            <span className='item-decoration item-price'> + RM 0.00</span>
                        </a>
                    </li>
                </Panel>
                <Panel header="Additional instruction" key="3">
                    <TextArea placeholder='Your order requirement here' rows={5} />
                </Panel>
            </Collapse>
            <Button type='primary' className='add-to-cart-btn'>
                <div className='btn-item'>
                    <span>ADD</span>
                    <IoIosAddCircleOutline className='btn-icon' />
                </div>
            </Button>
        </Modal>
    );
}

export default CondimentModal;