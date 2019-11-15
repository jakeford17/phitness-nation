import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    height: 125,
    width: 150,
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow'
});

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
        newExerciseOpen: false
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

    listExercises = () => {
        const active = true
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            this.setState({
                ...this.state,
                listExercises: response.data
            })
        })
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
        return (
            <div className="admin-exercise-wrapper">
                <div>
                    <input placeholder="Search Exercise" /> <button>Search</button></div>
                <table className="admin-exercises">
                    <tbody>
                        {this.state.listExercises.map((exercise) => {
                            return (
                                <tr key={exercise.id} className="admin-exercises-tr">
                                    <td className="admin-exercises-td" onClick={() => this.exerciseDescription(exercise)}>{exercise.name}</td>
                                    <td className="admin-exercises-td">
                                        <button className="archive-exercise" onClick={() => this.archiveExercise(exercise, false)}>ARCHIVE</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Fab style={styles.palette} aria-label="Add" onClick={() => this.handleNewExerciseOpen()}>
                    <AddIcon color={styles.palette.color} size="large" />
                </Fab>
                <Dialog open={this.state.newExerciseOpen} onClose={this.handleNewExerciseClose}>
                    <DialogTitle id="form-dialog-title"><h1>Add New Exercise:</h1></DialogTitle>
                    <DialogContent>
                       test test
                    </DialogContent>
                    <DialogActions>
                            <button onClick={this.handleNewExerciseClose}>
                                CANCEL
                                        </button>
                            {/* <button onClick={this.handleSubmit}>
                                YES
                                        </button> */}
                        </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminExerciseList));