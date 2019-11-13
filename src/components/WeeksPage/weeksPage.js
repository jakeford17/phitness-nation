import React, { Component } from 'react';
import { connect } from 'react-redux';
import './weeksPage.css';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';


const MyCard = styled(Card)({
  background: '#d2d2d4',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  // // color: 'white',
  // height: 60,
  width: "90%",
  padding: 10,
  margin: 5,
  fontSize: 20,
  display: flexbox,
  textAlign: "left"
});

class  UserDashboard extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_WORKOUTS'})
  }

  render() {
    return (
      <div className="weeks-page">
        <h1>Workouts by Week</h1>
        {this.props.reduxState.workouts.workoutsReducer.map((workout) => {
            return (
              <MyCard onClick={() => alert("redirect to this weeks workouts")}>
                <div>
                  <h4>Week {workout.week}</h4>
                </div>
              </MyCard>
            )
          })}
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UserDashboard);