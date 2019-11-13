import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserExercise extends Component {

    state = {
        exerciseId: 0,
    }

    componentDidMount = () => {
        let workoutExerciseIds = this.props.match.params.id.split('-')
        console.log('the workoutExerciseIds are', workoutExerciseIds)
        let workoutId = workoutExerciseIds[0]
        let exerciseId = workoutExerciseIds[1]
        console.log(workoutId, exerciseId)
        this.setState({
            exerciseId: exerciseId
        })
        this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: workoutId })
    }

    render() {
        return (
            <div>
                {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
                    if (exercise.id == this.state.exerciseId)
                    return (<>
                            <h1>{exercise.name}</h1>
                                <h2>Weight:</h2> {exercise.assigned_weight}
                                < h2 > Reps / Duration:</h2> {exercise.assigned_reps}
                    < h2 > Instructor Notes</h2 > {exercise.tips}< br /> <br />
        SLIDERS WITH PHIL PRESET VALUES HERE < br /> <br />
            <button onClick={() => alert("Back to Workout Preview or previous exercise")}>BACK</button>
            <button onClick={() => alert("Direct to Next Exercise/Workout Review page")}>NEXT</button> <br /> <br />
                PROGRESS BAR
                </>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UserExercise);