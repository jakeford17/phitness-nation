import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        id: 1,
        completed_sets: 1,
        completed_reps: 3,
        completed_weight: 100,
        feedback: 4
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'UPDATE_EXERCISE_WORKOUTS', payload: this.state})
    }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button onClick ={() => this.test()}>test</button>
        <br/>
        {JSON.stringify(this.props.reduxState)}
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Test);