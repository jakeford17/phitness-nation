import React, { Component } from 'react';
import 'date-fns';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios'




const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center"
});




const handleSubmit = event => {
    console.log('the user info to change is:', )
};


class AdminUserProfile extends Component {

    handleChange = (event, propertyName)  => {
        this.setState({
            user: {
                [propertyName]: event.target.value
            }
        });
    };

    componentDidMount() {
        this.userDetail();
    }


    state = {

        selectedUserId: this.props.match.params.id,
        user: {
            name: '',
            phone: '',
            email: '',
            emergency_contact_name: '',
            emergency_contact_phone: '',
            age: '',
            pronouns:''
        }

    }


    userDetail = () => {
        axios.get(`/api/admin/user/${this.state.selectedUserId}`).then((response) => {
            this.setState({
                user: {
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                    emergency_contact_name: response.data.emergency_contact_name,
                    emergency_contact_phone: response.data.emergency_contact_phone,
                    age: response.data.age,
                    pronouns: response.data.pronouns,
                }
            });
        }).catch((error) => {
            console.log('Error adding exercise', error)
        });
    }


    render() {

        return (
        
            <div className="inputs-wrapper">
                <MyTextField
                    label="Name"
                    value={this.state.user.name}
                    onChange={(event)=> this.handleChange(event , 'name')}
                    margin="normal"
                />
                <MyTextField
                    label="Pronouns (ex.: she/her/hers)"
                    value={this.state.user.pronouns}
                    onChange={(event) => this.handleChange(event , 'pronouns')}
                    margin="normal"
                />
                <MyTextField
                    label="Phone"
                    value={this.state.user.phone}
                    onChange={(event) => this.handleChange(event ,'phone')}
                    margin="normal"
                />
                <MyTextField
                    label="Email"
                    value={this.state.user.email}
                    onChange={(event) => this.handleChange(event ,'email')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Name"
                    value={this.state.user.emergency_contact_name}
                    onChange={(event) => this.handleChange(event ,'emergencyContactName')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Phone"
                    value={this.state.user.emergency_contact_phone}
                    onChange={(event) => this.handleChange(event ,'emergencyContactPhone')}
                    margin="normal"
                />
                <MyTextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    value={this.state.user.age}
                    onChange={() => this.state.handleChange('dateOfBirth')}
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