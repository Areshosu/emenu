import React, { Component } from 'react';
import Counter from '../components/counter'

class Counters extends Component {
    state = { 
        counters: [
            {id: 1, value: 0},
            {id: 2, value: 4},
            {id: 3, value: 0},
            {id: 4, value: 0},
            {id: 5, value: 0},
        ]
     } 
    
    removeCounter = counter_id => {
        const counters = this.state.counters.filter((counter) => counter.id !== counter_id)
        this.setState({ counters })
    }

    render() { 
        return (
            <React.Fragment>
                {this.state.counters.map(counter => <Counter key={counter.id} id={counter.id} value={counter.value} deletefn={this.removeCounter} selected={true}/>)}
            </React.Fragment>
        );
    }
}
 
export default Counters;