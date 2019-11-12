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
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const MySelect = styled(Select)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    textAlign: "center",
    width: "100%"
});

const MyTextField = styled(TextField)({
    // background: '#F1EDBF',
    // border: 0,
    // borderRadius: 3,
    padding: 10,
    margin: 5,
    width: "100%",
    textAlign: "center"
});

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function FormDialog() {

    

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
        injuryType: 'Injury 1',
        injurySeverity: 'Mild',
        injuryDescription: 'A description of the injury would go here.',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const classes = useStyles();

    return (
        <>
            <div className="add-injury"><Fab color="primary" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Injury</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormHelperText>Type of Injury:</FormHelperText>
                        <MyTextField
                            value={values.injuryType}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('injuryType')}
                            margin="normal"
                        />
                        <FormHelperText>Severity:</FormHelperText>
                        <MySelect
                            label="Severity"
                            value={values.goalLength}
                            onChange={handleChange('injurySeverity')}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            <MenuItem value={"mild"}>Mild</MenuItem>
                            <MenuItem value={"moderate"}>Moderate</MenuItem>
                            <MenuItem value={"severe"}>Severe</MenuItem>
                        </MySelect>
                        <FormHelperText>Description of Injury:</FormHelperText>
                        <MyTextField
                            value={values.injuryDescription}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('injuryDescription')}
                            margin="normal"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}