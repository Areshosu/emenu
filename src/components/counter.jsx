import React, { Component } from 'react';
import { Button } from 'antd'
import { Space } from 'antd'

class Counter extends Component {
    state = {
        value: this.props.value,
        imageurl: 'https://picsum.photos/200',
        tags: [1,2,3,4]
    }

    // constructor() {
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this)
    // }

    renderTags() {
        if (this.state.tags.length < 1) return <h1>Please add tags!</h1>;

        return <ul> { this.state.tags.map(tag => <li key={tag}>{tag}</li>) } </ul>
    }

    handleIncrement = (product_id,data) => {
        this.setState({
            value: this.state.value + 1,
            tags: [...this.state.tags, (this.state.tags.length + 1)]
        })
        console.log(data)
    }

    handleReduction = () => {
        let local_tags = this.state.tags
        local_tags.pop()
        this.setState({
            tags: local_tags
        })
    }

    render() {
        return <React.Fragment>
            <Space align="center" size="large" direction="vertical"> <img src={this.state.imageurl} alt="main_image.png" />
                <span>{this.state.value}</span>
                <Button onClick={ () => this.handleIncrement(2,8)} type="primary">Create tags</Button>
                <Button onClick={this.handleReduction} type="danger">Delete tags</Button>
                <Button onClick={() => this.props.deletefn(this.props.id)} type="danger">Delete Counter Card</Button>
            </Space>
            {this.renderTags()}

        </React.Fragment>;
    }
}

export default Counter;