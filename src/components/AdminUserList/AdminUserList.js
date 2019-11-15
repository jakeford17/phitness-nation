import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    height: 125,
    width: 150,
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow'
});

const styles = {
    palette: {
        backgroundColor: "teal",
        color: "white"
    },
    fab: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        height: "21%",
        left: "0%",
        size: "large"

    },
    add: {
        color: "white",
        fontSize: "large"
    }
};

class AdminUserList extends Component {

    state = {
        listUser: [],
    }

    componentDidMount() {
        this.listUsers();
    }

    listUsers = () => {
        axios.get('/api/admin').then((response) => {
            console.log("grabbing user list:", response.data)
            this.setState({
                listUser: response.data
            })
        })
    }

    addUserBtn = () => {
        this.props.dispatch({ type: 'SET_TO_ADD_USER_MODE' });
        this.props.history.push('/adminadduser')
    }

    fetchClientID = (event) => {
        this.props.dispatch({ type: 'ACCESS_USER_INFO', payload: event.target.value });
        this.props.history.push(`/adminviewuser/${event.target.value}`);
    }

    render() {
        return (
            <div className="clients-wrapper">
                {this.state.listUser.map((user) => {
                    if (user.active === true) {
                        return (
                                <MyCard className="client-card-wrapper">
                                <p><h1 className="client-header1">{user.name} ({user.username})</h1>
                                    <div className="client-profile-wrapper">
                                        <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
                                    </div>
                                </p>
                                </MyCard>
                        );
                    }
                })}
                <div className="add-client-wrapper">
                <Fab style={styles.palette} aria-label="Add" onClick={() => this.addUserBtn()}>
                    <AddIcon color={styles.palette.color} size="large" />
                </Fab>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminUserList));