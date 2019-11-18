import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import ExerciseWorkoutCard from '../ExerciseWorkoutCard/ExerciseWorkoutCard';

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

class WorkoutCards extends Component {
    state = {
        currentExercise: {

        }
    }
    getExercises = () =>{
        axios.get('/api/admin/exercises')
    }
    render() {
        return (
        <div >
            {this.props.reduxState.workouts.workoutsReducer.map((week) =>{
                return(
                    <div >
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Week {week.week}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {week.workouts.map((workout) =>{
                                return(
                                    <>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>Workout {workout.id}: {workout.feedback}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {workout.exercises.map((exercise) =>{
                                                return(
                                                <ExerciseWorkoutCard userId = {this.props.userId} exercise = {exercise}/>
                                                )
                                            })}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    </>
                                )
                            })}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br/>
                    </div>
                )})
            }   
        </div>
        );
    }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutCards);