import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

const styles = {
    palette: {
        backgroundColor: "navy",
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
    }

    componentDidMount() {
        this.listExercises();
    }

    listExercises = () => {
        const active = true
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            this.setState({
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
            <div>
                <h1>Exercise List</h1>
                <div>
                    <input placeholder="Search Exercise" /> <button>Search</button></div>
                <table>
                    <tbody>
                        {this.state.listExercises.map((exercise) => {
                            return (
                                <tr key={exercise.id}>
                                    <td onClick={() => this.exerciseDescription(exercise)}>{exercise.name}</td>
                                    <td>
                                        <button onClick={() => this.archiveExercise(exercise, false)}>Archive</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Fab style={styles.palette} aria-label="Add" onClick={() => this.fabFunction()}>
                    <AddIcon color={styles.palette.color} size="large" />
                </Fab>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminExerciseList));