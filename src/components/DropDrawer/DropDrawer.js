import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/ListAlt';
import AssessmentIcon from '@material-ui/icons/Assessment';


const useStyles = makeStyles({
    list: {
        width: 124,
    },
    fullList: {
        width: 'auto',
    },
});
function SideDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >

            <List>
                <ListItem component={Link} to="/profile" button><AccountIcon className="icon" /> Profile </ListItem>
                <ListItem component={Link} to="/home" button><AssessmentIcon className="icon" /> Stats</ListItem>
                <ListItem component={Link} to="/about" button><InfoIcon className="icon" /> About</ListItem>
            </List>
            <Divider />
            {props.user.username ?
                <List>
                    <ListItem
                        component={Link} to="/home"
                        onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        button>
                        Logout
                   </ListItem>
                </List>
                :
                <div></div>
            }
        </div>
    );
    return (
        <div>
            <IconButton onClick={toggleDrawer('right', true)}><MenuIcon /></IconButton>
            <Drawer anchor ="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(SideDrawer);