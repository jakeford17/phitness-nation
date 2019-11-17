import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';

const mapStateToProps = reduxState => ({
    reduxState,
});

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});

export default connect(mapStateToProps)(function TextFields(props) {

    const [values, setValues] = React.useState({
        id: props.reduxState.adminToUserReducer.adminEditUserReducer.id,
        name: props.reduxState.adminToUserReducer.adminEditUserReducer.name,
        pronouns: props.reduxState.adminToUserReducer.adminEditUserReducer.pronouns,
        phone: props.reduxState.adminToUserReducer.adminEditUserReducer.phone,
        email: props.reduxState.adminToUserReducer.adminEditUserReducer.email,
        emergencyContactName: props.reduxState.adminToUserReducer.adminEditUserReducer.emergency_contact_name,
        emergencyContactPhone: props.reduxState.adminToUserReducer.adminEditUserReducer.emergency_contact_phone,
        dateOfBirth: props.reduxState.adminToUserReducer.adminEditUserReducer.age
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        props.dispatch({ type: 'UPDATE_USER', payload: {id: props.match.params.id, ...values}})
        // props.history.push('/adminviewuser/' + this.props.match.params.id)
    };

    const handleCancel = event => {
        // props.history.push('/adminviewuser/' + this.props.match.params.id)
    }

    const archiveUser = (id) => {
        // props.dispatch({ type: 'UPDATE_USER', payload: {id: props.match.params.id, ...values}})
        console.log("ARCHIVE", values.id);
        props.dispatch({ type: 'ARCHIVE_USER', payload: [id] });
        props.history.push('/admin')
    };

    return (
        <div className="inputs-wrapper">
            <MyTextField
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
            />
            <MyTextField
                label="Pronouns (ex.: she/her/hers)"
                value={values.pronouns}
                onChange={handleChange('pronouns')}
                margin="normal"
            />
            <MyTextField
                label="Phone"
                value={values.phone}
                onChange={handleChange('phone')}
                margin="normal"
            />
            <MyTextField
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
            />
            <MyTextField
                label="Emergency Contact Name"
                value={values.emergencyContactName}
                onChange={handleChange('emergencyContactName')}
                margin="normal"
            />
            <MyTextField
                label="Emergency Contact Phone"
                value={values.emergencyContactPhone}
                onChange={handleChange('emergencyContactPhone')}
                margin="normal"
            />
            <MyTextField
                id="date"
                label="Date of Birth"
                type="date"
                value={values.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="save-buttons">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </div>
            <div className="save-buttons">
            <Button variant="contained" color="secondary">
                Cancel
            </Button>
            </div>
            <div className="save-buttons">
            <Button variant="contained" color="secondary" onClick={() => archiveUser(values.id)}>
                Archive User
            </Button>
            </div>
         </div>
    );
})