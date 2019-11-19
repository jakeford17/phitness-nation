import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminEditUserProfile from '../AdminEditUserProfile/AdminEditUserProfile';
import AdminEditUserGoals from '../AdminEditUserGoals/AdminEditUserGoals';
import AdminEditUserInjuries from '../AdminEditUserInjuries/AdminEditUserInjuries';
import { connect } from 'react-redux';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}));
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
    };
    useEffect(() => {
        props.dispatch({ type: 'ADMIN_FETCH_USER', payload: props.userId })
    }, []);
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="PROFILE" {...a11yProps(0)} />
                    <Tab label="GOALS" {...a11yProps(1)} />
                    <Tab label="INJURIES" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <AdminEditUserProfile userId ={props.userId}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AdminEditUserGoals userId ={props.userId}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <AdminEditUserInjuries userId ={props.userId}/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
})