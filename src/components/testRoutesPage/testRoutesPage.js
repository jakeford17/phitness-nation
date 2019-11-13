import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        exercises: [
            {
                workout_id: 1,
                exercise_id: 1,
                assigned_reps: 5,
                assigned_sets: 6,
                assigned_weight: 7,
                tips: "YOU CAN DO IT"
            },
            {
                workout_id: 1,
                exercise_id: 1,
                assigned_reps: 5,
                assigned_sets: 6,
                assigned_weight: 7,
                tips: "YOU CANT't DO IT"
            },
            {
                workout_id: 1,
                exercise_id: 1,
                assigned_reps: 5,
                assigned_sets: 6,
                assigned_weight: 7,
                tips: "test test test"
            },
            {
                workout_id: 1,
                exercise_id: 1,
                assigned_reps: 5,
                assigned_sets: 6,
                assigned_weight: 7,
                tips: "THIS IS GREAT"
            }
        ]
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'POST_EXERCISE_WORKOUTS', payload: this.state.exercises})
    }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button onClick ={() => this.test()}>test</button>
        <br/>
        {JSON.stringify(this.props.reduxState)}
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Test);