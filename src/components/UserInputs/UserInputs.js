import React from 'react';
import 'date-fns';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center"
});

export default function TextFields() {

    const [values, setValues] = React.useState({
        name: 'Client Name',
        pronouns: 'she/her/hers',
        phone: '555-555-5555',
        email: 'test@test.com',
        emergencyContact: 'John Cena, 666-666-6666',
        dateOfBirth: new Date('2014-08-18T21:11:54')
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
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
                label="Pronouns"
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
                label="Emergency Contact"
                value={values.emergencyContact}
                onChange={handleChange('emergencyContact')}
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
            <Button variant="contained" color="primary">
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