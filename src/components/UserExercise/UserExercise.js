import React, { Component } from 'react';
import { connect } from 'react-redux';



class UserExercise extends Component {

    state = {
        exerciseId: 0,
        workoutId: 0,
        exerciseOrder: 0
    }

    handleClick = (props) => {
        this.props.history.push(`/exercise/${this.state.workoutId}-${this.state.exerciseId + 1}-${this.state.exerciseOrder + 1}`);
        this.setState({
            exerciseId: this.state.exerciseId += 1,
            workoutId: this.state.workoutId,
            exerciseOrder: this.state.exerciseOrder +=1
        })
    }

    handleBack = (props) => {
            if (this.state.exerciseOrder == 1) {
                this.props.history.push(`/preview/${this.state.workoutId}`)
            }
            else {
                this.props.history.push(`/exercise/${this.state.workoutId}-${this.state.exerciseId - 1}-${this.state.exerciseOrder - 1}`)
            }
        this.setState({
            exerciseId: this.state.exerciseId -= 1,
            workoutId: this.state.workoutId,
            exerciseOrder: this.state.exerciseOrder -= 1
        })
    }

    componentDidMount = () => {
        let workoutExerciseIds = this.props.match.params.id.split('-')
        let workoutId = parseInt(workoutExerciseIds[0])
        let exerciseId = parseInt(workoutExerciseIds[1])
        let exerciseOrder = parseInt(workoutExerciseIds[2])
        console.log(workoutId, exerciseId)
        this.setState({
            exerciseId: exerciseId,
            workoutId: workoutId,
            exerciseOrder: exerciseOrder
        })
        this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: workoutId })
    }

    render() {
        return (
            <div className="exercise-page">
                {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
                    if (exercise.id == this.state.exerciseId)
                    return (<>
                            <h1>{exercise.name}</h1>
                                <h2>Weight:</h2> {exercise.assigned_weight}
                                < h2 > Reps / Duration:</h2> {exercise.assigned_reps}
                    < h2 > Instructor Notes</h2 > {exercise.tips}< br /> <br />
        SLIDERS WITH PHIL PRESET VALUES HERE < br /> <br />
            <button onClick={(props) => this.handleBack(props)}>BACK</button>
                        <button onClick={(props) => this.handleClick(props)}>NEXT</button> <br /> <br />
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