import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const mapStateToProps = reduxState => ({
    reduxState,
});

const MySelect = styled(Select)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center",
    width: "75%"
});

const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    width: "75%",
    textAlign: "center"
});

export default connect(mapStateToProps)(function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.dispatch({ type: 'UPDATE_GOAL', payload: values });
        handleClose()
    }

    const [values, setValues] = React.useState({
        type: props.goal.type,
        description: props.goal.description,
        id: props.goal.id
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div>
            <Fab color="primary" aria-label="edit" onClick={handleClickOpen} size="small">
                <EditIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Goal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <MySelect
                            value={values.type}
                            onChange={handleChange('type')}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            <MenuItem value={"short term"}>Short Term</MenuItem>
                            <MenuItem value={"long term"}>Long Term</MenuItem>
                            <MenuItem value={"completed"}>Mark as Completed</MenuItem>
                        </MySelect>
                        <FormHelperText>Short term or long term goal?</FormHelperText>
                        <MyTextField
                            label="Description"
                            value={values.description}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('description')}
                            margin="normal"
                        />
                        <FormHelperText>Add a short description of your goal.</FormHelperText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})