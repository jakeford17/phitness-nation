import React, { Component } from 'react';
import UserTabs from '../UserTabs/UserTabs';
import './UserProfile.css';
import Placeholder from './Placeholder-Woman-img-1.jpg'

class Profile extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
            <div className="placeholder-wrapper">
                <img className="placeholder" src={Placeholder}></img>
            </div>
            <UserTabs/>
        </>
        )
    }
}

export default Profile;