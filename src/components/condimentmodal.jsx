import React, { Component } from 'react';
import { Modal, Collapse } from 'antd';
const { Panel } = Collapse;

class CondimentModel extends Component {
    state = {  } 
    render() { 
        return (
            <Modal title='Burger Pack' visible={true} style={{bottom: 10}} bodyStyle={{overflowY: 'scroll'}} footer={null}>
                <Collapse defaultActiveKey={[1,2,3]} expandIconPosition='end'>
                <Panel header="Select Add-ons" key="1"></Panel>
                <Panel header="Order takeout" key="2"></Panel>
                <Panel header="Additional instruction" key="3"></Panel>
                </Collapse>
            </Modal>
        );
    }
}
 
export default CondimentModel;