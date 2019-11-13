import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});

class AdminEditUser extends Component {
    state = {

    }
    componentDidMount = () =>{
        this.editInfo();
        this.info();
    }
    editInfo = () =>{
        this.props.dispatch({ type: 'ADMIN_FETCH_USER'})
    }
    info = () =>{
        this.setState({

        })
    }
    render() {
        return (
        <>
           <p>{JSON.stringify(this.props.reduxState.adminToUserReducer.adminEditUserReducer)}</p>
        </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AdminEditUser);