import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        id: 9,
        type: "long",
        description: "PULL A SEMI WITH MY TEETH"
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'UPDATE_GOAL', payload: this.state})
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