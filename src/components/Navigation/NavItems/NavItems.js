import React from 'react';
// import styled from 'styled-components';
// import NavItem from './NavItem/NavItem';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/authActions';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, 
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavItems = ({ loggedIn, editProfile, firebase }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" className="py-2">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        {loggedIn ? (
                            <Typography variant="h6" className={classes.title}>Instagram Demo</Typography>
                        ) : (
                            <Typography variant="h6" className={classes.title}>{loggedIn.displayName}</Typography>
                        )}

                        {loggedIn.uid ? (
                            <ButtonGroup size="large" color="inherit" variant="contained">
                                <Button color="secondary" onClick={() => history.push('/logout')} style={{ borderRadius: 0 }}>
                                    logout
                                </Button>
                            </ButtonGroup>
                        ) : (
                            <ButtonGroup size="large" color="primary" variant="contained">
                                <Button onClick={() => history.push('/login')} style={{ borderRadius: 0 }}>
                                    login
                                </Button>
                                <Button color="secondary" onClick={() => history.push('/signup')} style={{ borderRadius: 0 }}>
                                    signup
                                </Button>
                            </ButtonGroup>
                        )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
};

const mapStateToProps = ({ firebase, auth }) => ({
    firebase,
    loading: auth.profileEdit.loading,
    error: auth.profileEdit.error,
    loadingDelete: auth.deleteUser.loading,
    errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
    editProfile: actions.editProfile,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavItems);
