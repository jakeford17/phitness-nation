import React, { Component } from 'react';
import ArchivedTabs from '../ArchivedTabs/ArchivedTabs';
import './Archived.css';

class Archived extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
            <h1>Archived Users and Exercises</h1>
            <ArchivedTabs/>
            </>
        )
    }
}

export default Archived;