import React from 'react';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center"
});

export default connect(mapStateToProps)(function TextFields(props) {

    const [values, setValues] = React.useState({
        id: props.reduxState.user.id,
        name: props.reduxState.user.name,
        pronouns: props.reduxState.user.pronouns,
        phone: props.reduxState.user.phone,
        email: props.reduxState.user.email,
        emergencyContactName: props.reduxState.user.emergency_contact_name,
        emergencyContactPhone: props.reduxState.user.emergency_contact_phone,
        dateOfBirth: props.reduxState.user.age
    });

    const discardChanges = () => {
        setValues({
            id: props.reduxState.user.id,
            name: props.reduxState.user.name,
            pronouns: props.reduxState.user.pronouns,
            phone: props.reduxState.user.phone,
            email: props.reduxState.user.email,
            emergencyContactName: props.reduxState.user.emergency_contact_name,
            emergencyContactPhone: props.reduxState.user.emergency_contact_phone,
            dateOfBirth: props.reduxState.user.age
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        console.log('the user info to change is:', values)
        props.dispatch({ type: 'UPDATE_USER', payload: values})
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
            <button onClick={handleSubmit}>
                SAVE CHANGES
            </button>
            <button onClick={discardChanges}>
                CANCEL
            </button>
            </div>

         </div>
    );
})