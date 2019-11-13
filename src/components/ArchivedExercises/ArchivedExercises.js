import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ArchivedExercises extends Component {

    state = {
        listExercises: []
    }

    componentDidMount() {
        this.listExercises();
    }

    listExercises = () => {
        const active = false;
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            console.log("grabbing exercise list:", response.data)
            this.setState({
                listExercises: response.data
            })
        })
    }

    render() {
        return (
            <div>
                 <div>
                    <h1>Archived Exercise List</h1>
                    <h4><b><i>Turn divs into cards and add search bar</i></b></h4>
                        {this.state.listExercises.map((exercise) => {
                            if (exercise.active === false) { 
                            return (
                                <div key={exercise.id}>
                                    Name: {exercise.name}<br/>
                                    <button>Reactivate</button> <button>Permanently Delete</button><br/><br/>
                                </div>
                            );
                            }
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ArchivedExercises);