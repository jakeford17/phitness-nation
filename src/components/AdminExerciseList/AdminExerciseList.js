import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    palette: {
        backgroundColor: "teal",
        color: "white"
    },
    fab: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        height: "21%",
        left: "0%",
        size: "large"

    },
    add: {
        color: "white",
        fontSize: "large"
    }
};

class AdminExerciseList extends Component {

    state = {
        listExercises: [],
        newExerciseOpen: false,
        newExerciseName: '',
        exerciseDescriptionOpen: false,
        exerciseDetails: {},
        editModal: false
    }

    handleChange = (event) => {
        this.setState({...this.state,
            newExerciseName: event.target.value,
        });
    }

    componentDidMount() {
        this.listExercises();
    }

    handleNewExerciseOpen = () => {
        this.setState({
            ...this.state,
            newExerciseOpen: true
        })
    }

    handleNewExerciseClose = () => {
        this.setState({
            ...this.state,
            newExerciseOpen: false
        })
    }

    handleExerciseDescriptionOpen = (exercise) => {
        this.setState({
            ...this.state,
            exerciseDescriptionOpen: true,
            exerciseDetails: exercise
        })
    }

    handleExerciseDescriptionClose = () => {
        this.setState({
            ...this.state,
            exerciseDescriptionOpen: false
        })
    }

    setEditMode = () => {
        this.setState({
            ...this.state,
            editModal: true
        })
    }
    setEditModeFalse = () => {
        this.setState({
            ...this.state,
            editModal: false
        })
    }

    listExercises = () => {
        const active = true
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            this.setState({
                ...this.state,
                listExercises: response.data
            })
        })
    }

    handleSubmit = () => {
        this.props.dispatch({ type:'ADD_EXERCISE', payload: {name: this.state.newExerciseName}});
        this.setState({
            ...this.state,
            newExerciseOpen: false
        });
        this.listExercises()
    }

    archiveExercise = (exercise, archive) => {
        const active = { active: archive };
        axios.put(`/api/admin/exerciseArchive/${exercise.id}`, active).then((response) => {
            swal("Updated!", "Archiving Exercise Complete");
            this.listExercises();
        }).catch((err) => {
            console.log('error when archiving exercise', err)
        })
    }

    render() {
        let editModal;
       if (this.state.editModal == false) {
           editModal = <><DialogContent>
               <h4 className="edit-ex-modal">Exercise Name:</h4>
               {this.state.exerciseDetails.name}
               <br></br>
               <br></br>
                <h4 className="edit-ex-modal">Description / Links: </h4>
                {this.state.exerciseDetails.links}
            </DialogContent>
            <DialogActions>
                <button onClick={this.handleExerciseDescriptionClose}>
                    CLOSE
                            </button>
                <button onClick={this.setEditMode}>
                    EDIT
                        </button>
            </DialogActions>
            </>
       } else {
           editModal = <>
               <DialogContent className="edit-exercise-modal" ><h4 className="edit-ex-modal">Exercise Name: </h4>
                    <input className="editExerciseInput" placeholder={this.state.exerciseDetails.name}></input>
                   <br></br>
                   <h4 className="edit-ex-modal">Description / Links: </h4>
                   <textarea className="editExerciseInput" 
                   placeholder={this.state.exerciseDetails.links}></textarea>
               </DialogContent>
               <DialogActions>
                   <button onClick={this.setEditModeFalse}>
                       CANCEL
                            </button>
                   {/* <button onClick={this.setEditMode}>
                       SAVE
                        </button> */}
               </DialogActions>
           </>
       }

        return (
            <div className="admin-exercise-wrapper">
                <h4>Click the exercise to see details.</h4>
                <div>
                    <input placeholder="Search Exercise" /> <button>Search</button></div>
                <table className="admin-exercises">
                    <tbody>
                        {this.state.listExercises.map((exercise) => {
                            return (
                                <>
                                <tr key={exercise.id} className="admin-exercises-tr">
                                    <td className="admin-exercises-td" onClick={() => this.handleExerciseDescriptionOpen(exercise)}>{exercise.name}</td>
                                    <td className="admin-exercises-td">
                                        <button className="archive-exercise" onClick={() => this.archiveExercise(exercise, false)}>ARCHIVE</button>
                                    </td>
                                </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
                <div className="add-exercise-wrapper">
                <Fab style={styles.palette} aria-label="Add" onClick={() => this.handleNewExerciseOpen()}>
                    <AddIcon color={styles.palette.color} size="large" />
                </Fab>
                </div>
                <Dialog open={this.state.newExerciseOpen} onClose={this.handleNewExerciseClose}>
                    <DialogTitle id="form-dialog-title"><h3>Add New Exercise:</h3></DialogTitle>
                    <DialogContent>
                        New exercise name: <input className="newUserInput" onChange={this.handleChange}></input>
                    </DialogContent>
                    <DialogActions>
                            <button onClick={this.handleNewExerciseClose}>
                                CANCEL
                                        </button>
                            <button onClick={this.handleSubmit}>
                                ADD EXERCISE
                                        </button>
                        </DialogActions>
                </Dialog>
                <Dialog className="edit-exercise-modal" open={this.state.exerciseDescriptionOpen} onClose={this.handleExerciseDescriptionClose}>
                    {editModal}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminExerciseList));