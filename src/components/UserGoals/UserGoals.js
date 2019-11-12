import React, { Component } from 'react';
import AddGoalModal from '../AddGoalModal/AddGoalModal';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class Goals extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
        this.props.dispatch({ type: 'FETCH_GOALS'})
    }

    render() {
        let value = 'test'
        return (
            <>
                <h2>Short Term Goals:</h2>
                <ul>
                {this.props.reduxState.goals.goalsReducer.map((goal) => {
                    if (goal.type == 'short term'){
                    return (
                        <li><b>{goal.description}</b></li>
                    )
                    }
                }
                )}
                </ul>
                <h2>Long Term Goals:</h2>
                <ul>
                    {this.props.reduxState.goals.goalsReducer.map((goal) => {
                        if (goal.type == 'long term') {
                            return (
                                <li><b>{goal.description}</b></li>
                            )
                        }
                    }
                    )}
                </ul>
                <h2>Streaks:</h2>
                <h3>Current: 0 </h3>
                <h3>Longest: 420</h3>
                <AddGoalModal/>
            </>
        )
    }
}

export default connect(mapStateToProps)(Goals);