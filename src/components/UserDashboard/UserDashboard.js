import React, { Component } from 'react';
import { connect } from 'react-redux';

class  UserDashboard extends Component {
  

  render() {
    return (
      <div>
          <h1>Welcome {this.props.reduxState.user.name}</h1>
          <h3>Weekly Philosophy: {this.props.reduxState.user.philosophy}</h3>
          <h3>This Week's Workout</h3>
          <ul>
            <li>Workout 1</li>
            <li>Workout 2</li>
            <li>Workout 3</li>
          </ul>
          <p>Streak:</p>
          <p>[########------]</p>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UserDashboard);