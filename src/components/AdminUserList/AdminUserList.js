import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

const styles = {
    palette: {
        backgroundColor: "navy",
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
            <div>
                <h1>User List</h1>
                {this.state.listUser.map((user) => {
                    if (user.active === true) {
                        return (
                            <div key={user.id}>
                                <p>{user.name}<br />
                                    <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
                                </p>
                            </div>
                        );
                    }
                })}
                <Fab style={styles.palette} aria-label="Add" onClick={() => this.addUserBtn()}>
                    <AddIcon color={styles.palette.color} size="large" />
                </Fab>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminUserList));