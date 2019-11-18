import React, { Component } from 'react';
import AdminEditUserTabs from '../AdminEditUserTabs/AdminEditUserTabs';
import './AdminEditUser.css';

class AdminEditUser extends Component {
    render() {
        return (
            <>
            <div>
                <AdminEditUserTabs/>
            </div>
            </>
        )
    }
}

export default AdminEditUser;