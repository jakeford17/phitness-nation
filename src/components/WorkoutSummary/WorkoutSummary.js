import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';

const MyCard = styled(Card)({
  background: '#d2d2d4',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  // // color: 'white',
  // height: 60,
  width: "100%",
  padding: 10,
  margin: 5,
  fontSize: 24,
  display: flexbox,
  textAlign: "center",
});

class WorkoutSummary extends Component {

  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: this.props.match.params.id })
  }

  state = {
    feedback: 'Add any overall workout feedback you have here: what felt good, what felt not so good, what you liked, etc.'
  }

  handleChange = (event) => {
    this.setState({
      feedback: event.target.value
    })
  }

  render() {
    return (
      <div className="workout-summary">
        <h1 className="workout-summary-h1">Congratulations! You have completed this workout.</h1>
        <div className="workout-feedback-wrapper"><h3 className="workout-summary-h3">Workout Summary:</h3>
        </div>
        {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
          return (
            <MyCard>
              <h4 className="workout-summary-h4">{exercise.name}</h4>
              Reps: {exercise.completed_reps} |
              Sets: {exercise.completed_sets} |
                Weight: {exercise.completed_weight}
                <br></br>
                Feedback: {exercise.feedback}
            </MyCard>
          )
        })}
        <div className="workout-feedback-wrapper">
        <h3 className="workout-summary-h3">Overall Feedback:</h3>
        </div>
        <div className="workout-feedback-wrapper">
        <textarea className="workout-feedback"
          placeholder={this.state.feedback}
          onChange={this.handleChange}
        />
        </div>
        <button onClick ={() => alert("Submit Completed Workout to DB...Add an alert to make sure before submitting?")}>SUBMIT WORKOUT</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutSummary);