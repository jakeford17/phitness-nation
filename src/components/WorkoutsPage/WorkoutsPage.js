import React, { Component } from 'react';
import { connect } from 'react-redux';

class  WorkoutsPage extends Component {
  

  render() {
    return (
      <div>
        <h1>Your Workouts For Week 1</h1>
        <button onClick ={() => alert("redirect to this workouts exercises")}>Workout 1</button>
        <button onClick ={() => alert("redirect to this workouts exercises")}>Workout 2</button>
        <button onClick ={() => alert("redirect to this workouts exercises")}>Workout 3</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapStateToProps)(WorkoutsPage);