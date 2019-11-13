import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        id: 24,
        assigned_sets: 4,
        assigned_reps: 3,
        assigned_weight: 140,
        tips: "YOU ARE JUST A SLUG, TRY HARDER"
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'DELETE_EXERCISE_WORKOUTS', payload: this.state.id})
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