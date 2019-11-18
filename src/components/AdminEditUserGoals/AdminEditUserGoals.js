import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import swal from 'sweetalert';

class AdminEditUserGoals extends Component {
    render() {
        return (
            <div>
                EDIT USER GOALS
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminEditUserGoals);