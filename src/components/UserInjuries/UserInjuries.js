import React, { Component } from 'react';
import AddInjuriesModal from '../AddInjuriesModal/AddInjuriesModal';

class Injuries extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
            <div className="injury-display">
                <h2>Injury 1:</h2>
                <p>A description of the injury would go here.</p>
            </div>
                <div className="injury-display">
                    <h2>Injury 2:</h2>
                    <p>A description of the injury would go here.</p>
                </div>
                <AddInjuriesModal />
            </>
        )
    }
}

export default Injuries;