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
class ExerciseWorkoutCard extends Component {
    state = {
        open: false,

    }
    componentDidMount = () =>{
        this.setExercises();
    }
    setExercises = () =>{
        this.setState({ ...this.props.exercise })
    }
    setOpen = () =>{
        this.setState({ open: true })
    }
    setClose = () =>{
        this.setState({ open: false })
    }
    handleChange = (event, propertyName) =>{
        this.setState({ [propertyName]: event.target.value })
    }
    handleSubmit = () =>{
        this.props.dispatch({ 
            type: 'ADMIN_UPDATE_EXERCISE_WORKOUTS', 
            payload: {
                user_id: this.props.userId,
                exercise: {
                    id: this.state.id, 
                    assigned_reps: this.state.assigned_reps, 
                    assigned_sets: this.state.assigned_sets, 
                    tips: this.state.tips 
                }
            }
        })
        this.setClose();
    }
    handleDelete = () =>{
        this.props.dispatch({ type: 'DELETE_EXERCISE_WORKOUTS', payload: {id: this.state.id, user_id: this.props.userId }})
    }
    render() {
        return (
            <div>
                <MyCard>
                    <Typography>{this.props.exercise.name}: {this.state.tips}</Typography>
                    <EditIcon onClick = {this.setOpen}/>
                    <DeleteIcon onClick = {this.handleDelete}/>
                </MyCard>
                <MyModal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.setClose}
                >
                    <MyPaper>
                        <Typography variant="h5" component="h3">
                            Exercise Overview
                        </Typography>
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
                        <Typography>Completed Sets: {this.state.completed_sets}</Typography>
                        <Typography>Completed Reps: {this.state.completed_reps}</Typography>
                        <Typography>Completed Weight: {this.state.completed_weight}</Typography>
                        <Typography>Feedback: {this.state.feedback}</Typography>
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

export default connect(mapStateToProps)(ExerciseWorkoutCard);