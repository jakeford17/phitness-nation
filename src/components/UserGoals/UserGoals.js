import React, { Component } from 'react';

class Goals extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
                <h2>Short Term Goals:</h2>
                <ul>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                    <li>Goal 3</li>
                </ul>
                <h2>Long Term Goals:</h2>
                <ul>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                    <li>Goal 3</li>
                </ul>
                <h2>Streaks:</h2>
                <h3>Current: 0 </h3>
                <h3>Longest: 420</h3>
            </>
        )
    }
}

export default Goals;