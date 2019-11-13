import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

class AdminLandPage extends Component {

    state = {
        UsertoExercise: true,
        listUser: [],
        listExercises: []
    }


    componentDidMount() {
        this.listUsers();
        this.listExercises();
    }

    //TOGGLE betwen tabs: List of workouts and users
    toggleTab = (toggle) => {
        this.setState({
            UsertoExercise: toggle
        })
    }

    //GET request displaying admin's list of clients (users)
    listUsers = () => {
        axios.get('/api/admin').then((response) => {
            console.log("grabbing user list:", response.data)
            this.setState({
                listUser: response.data
            })
        })
    }

    // onCick function directing Admin to exercise detail's page
    exerciseDescription = (exercise) => {
        this.props.history.push(`/exerciseDetail/${exercise.id}`)
    }

    listExercises = () => {
        axios.get('/api/admin/exercise').then((response) => {
            this.setState({
                listExercises: response.data
            })
        })
    }

   
    //Delete alert before deleting exercise
    deleteAlert = (exercise) => {
        confirmAlert({
            message: `Are you sure you want to delete this exercise?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteExerciseFunction(exercise)
                },
                {
                    label: 'No',
                }
            ]
        })
    };

     //DELETE exercise from library in database
     deleteExerciseFunction = (exercise) => {
        axios.delete(`/api/admin/exerciseDetail/${exercise.id}`).then(() => {
            this.listExercises();
        }
        ).catch((err) => {
            alert('delete exercise from library error', err)
        })
    }

    //Add Exercise button directing admin to addExercise Page
    fabFunction = () => {
        this.props.history.push('/addExercise');
    }


    render() {

        return (
            <div>
                {/* {JSON.stringify(this.state.listUser)} */}
                <div onClick={() => this.toggleTab(true)}>User</div>
                <div onClick={() => this.toggleTab(false)}>Workout</div>
                
                {(this.state.UsertoExercise) ?
                    <div>
                        <h1>User List</h1>
                        {this.state.listUser.map((user) => {
                            return (
                                <div key={user.id}>
                                    <p>{user.name}</p><p>{user.age}</p>
                                </div>
                            );
                        })}
                        <Fab style={styles.palette} aria-label="Add" onClick={() => this.props.history.push('/adminadduser')}>
                            <AddIcon color={styles.palette.color} size="large" />
                        </Fab>
                    </div>
                    : <div>
                        <h1>Exercise List</h1>
                        <div><input placeholder = "Search Exercise"/> <button>Search</button></div>
                        <table>
                            <tbody>
                                {this.state.listExercises.map((exercise) => {
                                    return (
                                        <tr key={exercise.id}>
                                            <td onClick={() => this.exerciseDescription(exercise)}>{exercise.name}</td>
                                            <td>
                                                <button onClick={() => this.deleteAlert(exercise)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Fab style={styles.palette} aria-label="Add" onClick={() => this.fabFunction()}>
                            <AddIcon color={styles.palette.color} size="large" />
                        </Fab>
                    </div>}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminLandPage);