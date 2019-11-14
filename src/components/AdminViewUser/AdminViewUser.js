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
        this.props.dispatch({ type: 'FETCH_USER' })
    }

    goToUserProfile = () => {
        this.props.history.push(`/adminuserprofile/${this.state.selectedUserId}`);

    }

    render() {
        let value = 'test'
        return (
            <>
            <div className="placeholder-wrapper">
                    <img onClick={() => this.goToUserProfile()} className="placeholder" src={Placeholder}></img>
            </div>
                <AdminViewUserTabs />

        </>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(AdminViewUser);