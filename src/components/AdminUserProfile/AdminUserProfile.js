import React, { Component } from 'react';
import 'date-fns';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';


const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center"
});


const handleChange = name => event => {
    // setValues({ ...values, [name]: event.target.value });
};

const handleSubmit = event => {
    console.log('the user info to change is:', )
};


class AdminUserProfile extends Component {
    render() {

        return (
            <div className="inputs-wrapper">
                <MyTextField
                    label="Name"
                    // value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <MyTextField
                    label="Pronouns (ex.: she/her/hers)"
                    // value={values.pronouns}
                    onChange={handleChange('pronouns')}
                    margin="normal"
                />
                <MyTextField
                    label="Phone"
                    // value={values.phone}
                    onChange={handleChange('phone')}
                    margin="normal"
                />
                <MyTextField
                    label="Email"
                    // value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Name"
                    // value={values.emergencyContactName}
                    onChange={handleChange('emergencyContactName')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Phone"
                    // value={values.emergencyContactPhone}
                    onChange={handleChange('emergencyContactPhone')}
                    margin="normal"
                />
                <MyTextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    defaultValue="2017-05-24"
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
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(AdminUserProfile);