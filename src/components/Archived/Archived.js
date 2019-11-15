import React, { Component } from 'react';
import ArchivedTabs from '../ArchivedTabs/ArchivedTabs';
import './Archived.css';

class Archived extends Component {
    render() {
        return (
            <>
            <h1>Archived Users and Exercises</h1>
            <ArchivedTabs/>
            </>
        )
    }
}

export default Archived;