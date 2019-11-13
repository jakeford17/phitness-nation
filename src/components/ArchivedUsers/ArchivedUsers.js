import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
                                    <button>Reactivate</button> <button>Permanently Delete</button><br/><br/>
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