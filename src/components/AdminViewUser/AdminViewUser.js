import React, { Component } from 'react';
import AdminViewUserTabs from '../AdminViewUserTabs/AdminViewUserTabs';
import './AdminViewUser.css';
import Placeholder from './Placeholder-Woman-img-1.jpg';

class AdminViewUser extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }
    goEditUser = (id) =>{
        this.props.history.push(`/admin/edituser/${id}`)
    }
    render() {
        return (
            <>
            <div className="placeholder-wrapper">
                <img onClick={() => this.goEditUser(this.props.match.params.id)} className="placeholder" src={Placeholder}></img>
            </div>
            <AdminViewUserTabs/>
        </>
        )
    }
}

export default AdminViewUser;