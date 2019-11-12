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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

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

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
        type: props.injury.type,
        severity: props.injury.severity,
        description: props.injury.description,
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const classes = useStyles();

    return (
        <>
        {/* {JSON.stringify(props.injury.type)} */}
            <Fab color="primary" aria-label="edit" className={classes.fab} onClick={handleClickOpen} size="small">
                <EditIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Injury</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormHelperText>Type of Injury:</FormHelperText>
                        <MyTextField
                            value={values.type}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('type')}
                            margin="normal"
                        />
                        <FormHelperText>Severity:</FormHelperText>
                        <MySelect
                            label="Severity"
                            value={values.severity}
                            onChange={handleChange('severity')}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            <MenuItem value={1}>Mild</MenuItem>
                            <MenuItem value={2}>Moderate</MenuItem>
                            <MenuItem value={3}>Severe</MenuItem>
                            <MenuItem value={0}>Healed</MenuItem>
                        </MySelect>
                        <FormHelperText>Description of Injury:</FormHelperText>
                        <MyTextField
                            value={values.description}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('description')}
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