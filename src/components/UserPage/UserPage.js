import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Workout from '../WorkoutComponent/WorkoutsComponent';


class UserPage extends Component{
  componentDidMount = () =>{
    this.getWorkouts();
  }
  getWorkouts = () =>{
    this.props.dispatch({ type: 'FETCH_WORKOUTS' })
  }
  render() {
    return(
      <div>
        <h1 >
          Welcome, { this.props.reduxState.user.name }!
        </h1>
        <h2>
          Weekly Philosophy: { this.props.reduxState.user.philosophy }
        </h2>
        <h3>
          Streak: [#######----]
        </h3>

        <LogOutButton className="log-in" />
      </div>
    )

  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
