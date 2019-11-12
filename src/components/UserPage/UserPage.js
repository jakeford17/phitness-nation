import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import {ProgressBar} from 'react-bootstrap'

const MyCard = styled(Card)({
  background: 'transparent',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  // // color: 'white',
  // height: 60,
  width: "90%",
  padding: 10,
  margin: 5,
  fontSize: 16,
  display: flexbox,
  textAlign: "center"
});

class UserPage extends Component{
  componentDidMount = () =>{
    this.getWorkouts();
  }
  getWorkouts = () =>{
    this.props.dispatch({ type: 'FETCH_WORKOUTS' })
  }
  render() {
    return(
      <>
      <div className="user-page">
        <h1 >
          Welcome, { this.props.reduxState.user.name }!
        </h1>
        <h2>
          Weekly PHILosophy: 
        </h2>
          <MyCard>
            {this.props.reduxState.user.philosophy}
          </MyCard>
        <h3>
          Streak:
          <div className="streak">
              <ProgressBar striped variant="success" now={this.props.reduxState.user.current_streak} />
            </div>
        </h3>

        <LogOutButton className="log-in" />
      </div>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
