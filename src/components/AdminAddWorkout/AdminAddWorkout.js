import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});

class AdminAddWorkout extends Component {
    state = {
        user_id: this.props.reduxState.adminToUserReducer.adminToUserReducer,
        week: 0,
        //exercise_id, assigned_reps, assigned_sets, assigned_weight, tips
        exercises: [

        ],
        email: false,
        injuries: [

        ],
        listExercises: [  

        ],
        tempExercise: {
            exercise_id: 0,
            assigned_reps: '',
            assigned_sets: '',
            assigned_weight: '',
            tips: ''
        }
    }
    componentDidMount = () =>{
        this.getExercises();
    }
    getExercises = () =>{
        this.props.dispatch({ type: 'FETCH_EXERCISES', payload: {active: true}})
        setTimeout(() =>{
            this.props.reduxState.exerciseWorkouts.exerciseReducer.map((exercise) =>{
                console.log('mapping')
                this.setState({
                    listExercises: [...this.state.listExercises, {value: exercise.id, label: exercise.name }]
                })
            })
        }, 1000)
    }
    handleSelectChange = (value, actionMeta) => {
        if(value != null){
            this.setState({
                tempExercise: {...this.state.tempExercise, exercise_id: value.value }
            })
        }else{
            this.setState({
                tempExercise: {...this.state.tempExercise, exercise_id: 0 }
            })
        }
      };
    
    handleCreate = (exerciseName) => {
    // this.setState({isLoading: true})
    this.props.dispatch({type: 'ADD_EXERCISE', payload: {name: exerciseName}})
    setTimeout(() => {
        const newExercise = this.createNewExercise(exerciseName);
        this.setState({
            listExercises: [...this.state.listExercises, newExercise],
        });
    }, 1000);
    }

    handleChange = (event, propertyName) =>{
        this.setState({ tempExercise: { ...this.state.tempExercise, [propertyName]: event.target.value }})
    }
    addExercise = () =>{
        this.setState({ exercises: [
            ...this.state.exercises, {
                exercise_id: this.state.tempExercise.exercise_id,
                assigned_reps: this.state.tempExercise.assigned_reps,
                assigned_sets: this.state.tempExercise.assigned_sets,
                assigned_weight: this.state.tempExercise.assigned_weight,
                tips: this.state.tempExercise.tips
            }
        ]})
        this.setState({ tempExercise: {
            exercise_id: '',
            assigned_reps: '',
            assigned_sets: '',
            assigned_weight: '',
            tips: ''
        }})
    }
    emailToggle = () =>{
        this.setState({ email: !this.state.email })
    }
    render() {
        return (
            <>
            {JSON.stringify(this.state)}
            {JSON.stringify(this.props.reduxState)}
            <CreatableSelect
                isClearable
                onChange={this.handleSelectChange}
                onCreateOption ={this.handleCreate}
                options={this.state.listExercises}
            />
            <MyTextField
                label="Sets"
                value={this.state.tempExercise.assigned_sets}
                onChange={(event) => this.handleChange(event, 'assigned_sets')}
                margin="normal"
            />
            <MyTextField
                label="Reps"
                value={this.state.tempExercise.assigned_reps}
                onChange={(event) => this.handleChange(event, 'assigned_reps')}
                margin="normal"
            />
            <MyTextField
                label="Weight"
                value={this.state.tempExercise.assigned_weight}
                onChange={(event) => this.handleChange(event, 'assigned_weight')}
                margin="normal"
            />
            <MyTextField
                multiline={true}
                rows={2}
                rowsMax={4}
                fullWidth
                label="Tips"
                value={this.state.tempExercise.tips}
                onChange={(event) => this.handleChange(event, 'tips')}
                margin="normal"
            />
            <Button 
                variant="contained" 
                onClick = {this.addExercise}>
                Add Exercise
            </Button>
            <br/>
            <h2>Exercises:</h2>
            <ul>
            {this.state.exercises.map(exercise =>{
                let exerciseName;
                for(let i = 0; i<this.state.listExercises.length; i++){
                    if(this.state.listExercises[i].value === exercise.exercise_id){
                        exerciseName = this.state.listExercises[i].label
                    }
                }
                return(
                    <li>{exerciseName}</li>
                )
            })}
            </ul>
            <br/>
            <FormControlLabel
            
            control = {
            <Checkbox
                color="default"
                checked={this.state.email}
                onChange={this.emailToggle}
                value={false}
            />}
            label = "Email Client?"
            labelPlacement="end"
            />
            <Button 
                variant="contained" 
                onClick = {this.addExercise}>
                Submit Workout
            </Button>
            </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AdminAddWorkout);