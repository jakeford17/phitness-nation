import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Slider from '@material-ui/core/Slider';

const MySlider = styled(Slider)({
    color: '#3d6363',
})

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "100%",
    padding: 15,
    margin: 5,
    fontSize: 24,
    display: flexbox,
    textAlign: "center",
});


class UserExercise extends Component {

    state = {
        exerciseId: 0,
        workoutId: 0,
        exerciseOrder: 0,
        weightAchieved: 0,
        repsAchieved: 0,
        setsAchieved: 0
    }

    handleWeightChange = (name, value) => {
        let newWeight = parseInt(value.target.innerText)
        this.setState({ ...this.state, [name]: newWeight});
        console.log('the new state is:', this.state)
    };

    handleRepsChange = (name, value) => {
        let newReps = parseInt(value.target.innerText)
        this.setState({ ...this.state, [name]: newReps });
        console.log('the new state is:', this.state)
    };

    handleSetsChange = (name, value) => {
        let newSets = parseInt(value.target.innerText)
        this.setState({ ...this.state, [name]: newSets });
        console.log('the new state is:', this.state)
    };

    handleClick = (props) => {
        this.props.history.push(`/exercise/${this.state.workoutId}-${this.state.exerciseId + 1}-${this.state.exerciseOrder + 1}`);
        this.setState({...this.state,
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
        this.setState({...this.state,
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
        this.setState({...this.state,
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
                    <MyCard>
                            <h1>{exercise.name}</h1>
                                <h5>Weight: {exercise.assigned_weight} |
                                Reps / Duration: {exercise.assigned_reps} |
                                Sets: {exercise.assigned_sets}</h5>
                    < h3 > Instructor Notes:</h3 > {exercise.tips}
                    </MyCard>
                    <div className="exercise-feedback">
                    <h2>How did you do?</h2>
                        Weight: <MySlider
                            defaultValue={exercise.assigned_weight}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={((exercise.assigned_weight)/5)}
                            marks
                            min={0}
                            max={(exercise.assigned_weight*1.5)}
                            onChange={(value) => this.handleWeightChange('weightAchieved', value)}
                            // valueLabelDisplay="on"
                        />
                        Reps / Duration: <MySlider
                            defaultValue={exercise.assigned_reps}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={(exercise.assigned_reps * 1.5)}
                            onChange={(value) => this.handleRepsChange('repsAchieved', value)}
                        // valueLabelDisplay="on"
                        />
                        Sets: <MySlider
                            defaultValue={exercise.assigned_sets}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={(exercise.assigned_sets * 1.5)}
                                onChange={(value) => this.handleSetsChange('setsAchieved', value)}
                        // valueLabelDisplay="on"
                        />
                        </div>
                 < br /> <br />
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