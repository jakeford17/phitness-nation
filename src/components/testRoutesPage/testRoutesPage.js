import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        user_id: 1,
        week: 5,
        exercises: [
          {
            exercise_id: 1,
            assigned_reps: 4,
            assigned_sets: 4,
            assigned_weight: 150,
            tips: "WHAT A GREAT EXERCISE"
          },
          {
            exercise_id: 1,
            assigned_reps: 4,
            assigned_sets: 4,
            assigned_weight: 150,
            tips: "WHAT A GREAT EXERCISE"
          },
          {
            exercise_id: 1,
            assigned_reps: 4,
            assigned_sets: 4,
            assigned_weight: 150,
            tips: "WHAT A GREAT EXERCISE"
          }
        ]
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'POST_WORKOUTS', payload: this.state})
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