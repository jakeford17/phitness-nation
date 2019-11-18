import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import swal from 'sweetalert';

class AdminEditUserInjuries extends Component {
    render() {
        return (
            <div>
                EDIT USER INJURIES
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminEditUserInjuries);