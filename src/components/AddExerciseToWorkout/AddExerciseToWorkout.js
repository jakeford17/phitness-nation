import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CreatableSelect from 'react-select/creatable';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    width: "100%",
    padding: 10,
    margin: 5,
    fontSize: 100,
    display: flexbox,
    textAlign: "left",
});
const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});
const MyPaper = styled(Paper)({
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
})
const MyModal = styled(Modal)({
    top: `50%`,
    left: `50%`,
})

class AddExerciseToWorkout extends Component {
    state = {
        open: false,
        listExercises: [  

        ],
        exercise_id: 0,
        assigned_sets: '',
        assigned_reps: '',
        assigned_weight: '',
        tips: ''

    }
    componentDidMount = () =>{
        this.getExercises();
    }
    getExercises = () =>{
        this.props.dispatch({ type: 'FETCH_EXERCISES', payload: {active: true}})
        setTimeout(() =>{
            this.props.reduxState.exerciseWorkouts.exerciseReducer.map((exercise) =>{
                this.setState({
                    listExercises: [...this.state.listExercises, {value: exercise.id, label: exercise.name }]
                })
            })
        }, 1000)
    }
    handleCreate = (exerciseName) => {
        this.props.dispatch({type: 'ADD_EXERCISE', payload: {name: exerciseName}})
        setTimeout(() =>{
            this.setState({ listExercises: []})
            this.props.reduxState.exerciseWorkouts.exerciseReducer.map((exercise) =>{
                this.setState({
                    listExercises: [...this.state.listExercises, {value: exercise.id, label: exercise.name }]
                })
            })
        }, 1000)
    }
    handleChange = (event, propertyName) =>{
        this.setState({ [propertyName]: event.target.value })
    }
    handleSelectChange = (value) => {
        if(value != null){
            this.setState({
                exercise_id: value.value
            })
        }else{
            this.setState({
                exercise_id: 0 
            })
        }
        console.log(this.state.exercise_id)
      };
    setOpen = () =>{
        this.setState({ open: true })
    }
    setClose = () =>{
        this.setState({ open: false })
    }
    handleSubmit = () =>{
        this.props.dispatch({
            type: 'POST_EXERCISE_WORKOUTS', 
            payload: {
                user_id: this.props.userId,
                exercise:{
                    workout_id: this.props.workout_id, 
                    exercise_id: this.state.exercise_id,
                    assigned_reps: this.state.assigned_reps,
                    assigned_sets: this.state.assigned_sets,
                    assigned_weight: this.state.assigned_weight,
                    tips: this.state.tips,
                }
            }})
        this.setClose();
    }
    render() {
        return (
            <div>
                <Button onClick = {this.setOpen} variant="contained" >Add Exercise</Button>
                <MyModal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.setClose}
                >
                    <MyPaper>
                        <Typography variant="h5" component="h3">
                            New Exercise
                        </Typography>
                        <CreatableSelect
                            isClearable
                            onChange={this.handleSelectChange}
                            onCreateOption ={this.handleCreate}
                            options={this.state.listExercises}
                        />
                        <MyTextField
                            label="Sets"
                            value={this.state.assigned_sets}
                            onChange={(event) => this.handleChange(event, 'assigned_sets')}
                            margin="normal"
                        />
                        <MyTextField
                            label="Reps"
                            value={this.state.assigned_reps}
                            onChange={(event) => this.handleChange(event, 'assigned_reps')}
                            margin="normal"
                        />
                        <MyTextField
                            label="Weight"
                            value={this.state.assigned_weight}
                            onChange={(event) => this.handleChange(event, 'assigned_weight')}
                            margin="normal"
                        />
                        <MyTextField
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                            fullWidth
                            label="Tips"
                            value={this.state.tips}
                            onChange={(event) => this.handleChange(event, 'tips')}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                        <Button variant="contained" color="secondary" onClick = {this.setClose }>
                            Cancel
                        </Button>
                    </MyPaper>
                </MyModal>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AddExerciseToWorkout);