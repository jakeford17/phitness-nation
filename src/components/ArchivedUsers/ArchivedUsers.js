import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { confirmAlert } from 'react-confirm-alert';

class ArchivedUsers extends Component {

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

    permanentlyDeleteUser = (id) => {
        this.props.dispatch({ type: 'DELETE_USER', payload: id });
        this.listUsers();
    }

    handleDelete = (userid) => {
        confirmAlert({
            message: `Are you sure you want to delete this user? Once deleted, you will permanently lose this user's data and workout history.`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.permanentlyDeleteUser(userid)
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    render() {
        return (
            <div>
                 <div>
                    <h1>Archived User List</h1>
                    <h4><b><i>Turn divs into cards and add search bar</i></b></h4>
                        {this.state.listUser.map((user) => {
                            if (user.active === false) { 
                            return (
                                <div key={user.id}>
                                    Name: {user.name} <br/>DOB: {user.age}<br/>Phone: {user.phone}<br/>
                                    <button>Reactivate</button> <button onClick={() => this.handleDelete(user.id)}>Permanently Delete</button><br/><br/>
                                </div>
                            );
                            }
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ArchivedUsers);