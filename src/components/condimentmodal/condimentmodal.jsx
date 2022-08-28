import React from 'react';
import './condimentmodal.scoped.css'
import { Modal, Collapse, Button, Checkbox, Input } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io'
const { Panel } = Collapse;
const { TextArea } = Input;

function CondimentModal(props) {
        return (
            <Modal className='condiment-modal' title='Burger Pack' onCancel={() => props.handleVisibility(false)} visible={props.visible} style={{ bottom: 10 }} bodyStyle={{ overflowY: 'scroll' }} footer={null}>
                <Collapse defaultActiveKey={[1, 2, 3]} expandIconPosition='end'>
                    <Panel header="Select Add-ons" key="1">
                        <li>
                            <a href='#/' style={{ display: 'flex' }}>
                                <Checkbox key='c1'> Extra Cream </Checkbox> 
                                <span className='item-decoration item-price'> + RM 7.00</span>
                            </a>
                            <a href='#/' style={{ display: 'flex' }}>
                                <Checkbox key='c2'> Extra Sauce </Checkbox> 
                                <span className='item-decoration item-price'> + RM 5.00</span>
                            </a>
                            <a href='#/' style={{ display: 'flex' }}>
                                <Checkbox key='c3'> Extra Mee </Checkbox> 
                                <span className='item-decoration item-price'> + RM 14.00</span>
                            </a>
                        </li>
                    </Panel>
                    <Panel header="Order takeout" key="2">
                    <li>
                            <a href='#/' style={{ display: 'flex' }}>
                                <Checkbox key='d1'> Dine in </Checkbox> 
                            </a>
                            <a href='#/' style={{ display: 'flex' }}>
                                <Checkbox key='d2'> Take out </Checkbox> 
                            </a>
                        </li>
                    </Panel>
                    <Panel header="Additional instruction" key="3">
                        <TextArea placeholder='Your order requirement here' rows={5}/>
                    </Panel>
                </Collapse>
                <Button onClick={() => props.handleVisibility(false)} type='primary' className='add-to-cart-btn'>
                    <div className='btn-item'>
                        <span>ADD</span>
                        <IoIosAddCircleOutline className='btn-icon' />
                    </div>
                </Button>
            </Modal>
        );
}

export default CondimentModal;