import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserExercise extends Component {

    render() {
        return (
            <div>
                <h1>Exercise Name</h1>
                <h2>Weight:</h2> XXX
                <h2>Reps/Duration:</h2> XXX
                <h2>Instructor Notes</h2> XXX <br /><br />
                SLIDERS WITH PHIL PRESET VALUES HERE <br /><br />
                <button onClick={() => alert("Back to Workout Preview or previous exercise")}>BACK</button>
                <button onClick={() => alert("Direct to Next Exercise/Workout Review page")}>NEXT</button> <br /><br />
                PROGRESS BAR
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UserExercise);