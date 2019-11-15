import React, { Component } from 'react';
import AdminViewUserTabs from '../AdminViewUserTabs/AdminViewUserTabs';
import './AdminViewUser.css';
import Placeholder from './Placeholder-Woman-img-1.jpg';
import { connect } from 'react-redux';

class AdminViewUser extends Component {
    state = {
   
        selectedUserId: this.props.match.params.id,

    }
    componentDidMount() {
        this.props.dispatch({ type: 'ADMIN_FETCH_USER', payload: this.props.match.params.id })
    }

    goEditUser = () => {
        this.props.history.push(`/admin/edituser/${this.state.selectedUserId}`);
    }

    render() {
        return (
            <>
            <div className="placeholder-wrapper">

                <img onClick={() => this.goEditUser(this.props.match.params.id)} className="placeholder" src={Placeholder}></img>

            </div>
                <AdminViewUserTabs userId = {this.props.match.params.id}/>

        </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AdminViewUser);