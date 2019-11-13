import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Test extends Component {
    state = {
        username: 'JOHN CENA',
        pronouns: 'he/him',
        phone: '452-533-9134',
        email: 'jcena@thebestwrestler.com',
        emergencyContactName: 'JCENA',
        emergencyContactPhone: '452-234-2342',
        dateOfBirth: '4/2/1234'
    }
    test = () =>{
        console.log('test')
        this.props.dispatch({type: 'UPDATE_USER', payload: this.state})
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