import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkoutPreview extends Component {

  render() {
    return (
      <div>
        <h1>Name of Workout</h1>
        <h2>Preview</h2>
        <h4>Exercise 1 Name</h4>
        Reps/Sets/Weight
        <h4>Exercise 2 Name</h4>
        Reps/Sets/Weight
        <h4>Exercise 3 Name</h4>
        Reps/Sets/Weight
        <h4>Exercise 4 Name</h4>
        Reps/Sets/Weight
        <h4>Exercise 5 Name</h4>
        Reps/Sets/Weight
        <br/><br/>
        <button onClick ={() => alert("Back to list of workouts for the week")}>Back</button>
        <button onClick ={() => alert("Begin Workout...navigate to first exercise of workout; add an alert asking if user is sure they want to begin the workout")}>Begin Workout</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutPreview);