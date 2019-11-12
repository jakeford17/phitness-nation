import React, { Component } from 'react';
import { connect } from 'react-redux';
//import axios from 'axios';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';


class AddExercise extends Component {

    state = {

    }



    render() {

        return (
            <div>
                <h1>add exercise page</h1>
                <input placeholder="Exercise Name"></input>
                <input placeholder="Weight"></input>
                <input placeholder="Set"></input>
                <input placeholder="Frequency"></input>
                <select>
                    <option value="reps">reps</option>
                    <option value="sec">sec</option>
                    <option value="min">min</option>
                </select>

                <input placeholder = "notes"/>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AddExercise);