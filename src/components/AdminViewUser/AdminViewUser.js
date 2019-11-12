import React, { Component } from 'react';
import AdminViewUserTabs from '../AdminViewUserTabs/AdminViewUserTabs';
import './AdminViewUser.css';
import Placeholder from './Placeholder-Woman-img-1.jpg';

class AdminViewUser extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
            <div className="placeholder-wrapper">
                <img onClick={() => alert("Direct to User's Information/Edit User Info")} className="placeholder" src={Placeholder}></img>
            </div>
            <AdminViewUserTabs/>
        </>
        )
    }
}

export default AdminViewUser;