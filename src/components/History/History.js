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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SelectDrop from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});

class History extends Component {
    state = {
        user_id: this.props.reduxState.user.id,
        week: 1,
        //exercise_id, assigned_reps, assigned_sets, assigned_weight, tips
        exercises: [

        ],
        email: false,
        injuries: [

        ],
        listExercises: [],
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
        // this.getWeeks();
    }


    getExercises = () =>{
        this.props.dispatch({ type: 'FETCH_USER_EXERCISE_LIST', payload: this.state.user_id });
        this.setState ({
            listExercises: this.props.reduxState.userExerciseReducer
        })
    }
    // getWeeks = () =>{
    //     this.props.dispatch({ type: 'FETCH_WEEKS', payload: {id: this.state.user_id}})
    // }
    // handleSelectChange = (value) => {
    //     if(value != null){
    //         this.setState({
    //             tempExercise: {...this.state.tempExercise, exercise_id: value.value }
    //         })
    //     }else{
    //         this.setState({
    //             tempExercise: {...this.state.tempExercise, exercise_id: 0 }
    //         })
    //     }
    //   };
    
    // handleCreate = (exerciseName) => {
    //     this.props.dispatch({type: 'ADD_EXERCISE', payload: {name: exerciseName}})
    //     setTimeout(() =>{
    //         this.setState({ listExercises: []})
    //         this.props.reduxState.exerciseWorkouts.exerciseReducer.map((exercise) =>{
    //             this.setState({
    //                 listExercises: [...this.state.listExercises, {value: exercise.id, label: exercise.name }]
    //             })
    //         })
    //     }, 1000)
    // }

    // handleChange = (event, propertyName) =>{
    //     this.setState({ tempExercise: { ...this.state.tempExercise, [propertyName]: event.target.value }})
    // }
    // addExercise = () =>{
    //     this.setState({ exercises: [
    //         ...this.state.exercises, {
    //             exercise_id: this.state.tempExercise.exercise_id,
    //             assigned_reps: this.state.tempExercise.assigned_reps,
    //             assigned_sets: this.state.tempExercise.assigned_sets,
    //             assigned_weight: this.state.tempExercise.assigned_weight,
    //             tips: this.state.tempExercise.tips
    //         }
    //     ]})
    //     this.setState({ tempExercise: {
    //         exercise_id: '',
    //         assigned_reps: '',
    //         assigned_sets: '',
    //         assigned_weight: '',
    //         tips: ''
    //     }})
    // }
   

    
    render() {
        return (
            <>
            {/* {JSON.stringify(this.state)} */}
            {JSON.stringify(this.props.reduxState.userExerciseReducer)}
            
            <CreatableSelect
                isClearable
                onChange={this.handleSelectChange}
                onCreateOption ={this.handleCreate}
                options={this.state.listExercises}
            />
           
            <Button 
                variant="contained" 
                onClick = {this.addExercise}>
                Add Exercise
            </Button>
            <Button 
                variant="contained" 
                onClick = {this.addWorkout}>
                Add Workout
            </Button>

            {this.state.listExercises.map((exercise) => {
                return ( <div>
                    <p>{exercise.name}</p>
                    </div>
                )
            })}
            </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(History);