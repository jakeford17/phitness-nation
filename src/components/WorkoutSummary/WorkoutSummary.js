import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkoutSummary extends Component {

  render() {
    return (
      <div>
        <h1>Workout Summary</h1>
        <h2>Exercise 1</h2>
        Reps/Sets/Weight/Exertion level
        <h2>Exercise 2</h2>
        Reps/Sets/Weight/Exertion level
        <h2>Exercise 3</h2>
        Reps/Sets/Weight/Exertion level
        <h2>Exercise 4</h2>
        Reps/Sets/Weight/Exertion level
        <h2>Exercise 5</h2>
        Reps/Sets/Weight/Exertion level
        <br/><br/>
        <textarea placeholder="User feedback on the overall workout goes here"/>
        <br/><br/>
        <button onClick ={() => alert("Submit Completed Workout to DB...Add an alert to make sure before submitting?")}>Submit Workout</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutSummary);