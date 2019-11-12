import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

    listUsers = () => {
        axios.get('/api/admin').then((response) => {
            console.log("grabbing user list:", response.data)
            this.setState({
                listUser: response.data
            })
        })
    }

    listExercises = () => {
        axios.get('/api/admin/exercise').then((response) => {
            this.setState({
                listExercises: response.data
            })
        })
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
                    </div>
                    : <div>
                        <h1>Exercise List</h1>
                        <table>
                            <tbody>
                                {this.state.listExercises.map((exercise) => {
                                    return (
                                        <tr key={exercise.id}>
                                            <td>{exercise.name}</td>
                                                <td>
                                                <button>Edit</button>
                                                <button>Archive</button>
                                                </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Fab style={styles.palette} aria-label="Add" onClick={() => this.addPtsFunction()}>
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