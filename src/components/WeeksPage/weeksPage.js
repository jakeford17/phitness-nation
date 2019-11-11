import React, { Component } from 'react';
import { connect } from 'react-redux';

class  UserDashboard extends Component {

  render() {
    return (
      <div>
        <h1>Weeks</h1>
        <button onClick ={() => alert("redirect to this weeks workouts")}>Week 1</button>
        <button onClick ={() => alert("redirect to this weeks workouts")}>Week 2</button>
        <button onClick ={() => alert("redirect to this weeks workouts")}>Week 3</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UserDashboard);