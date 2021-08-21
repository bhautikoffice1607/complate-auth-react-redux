import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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

const Navbar = ({ logoutUser }) => {
    const classes = useStyles();
    const history = useHistory();
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 200);
        });
    }, []);

    const { isLoggedIn, user } = useSelector(
        (state) => ({
            isLoggedIn: state.auth.isLoggedIn,
            user: state.auth.user,
        }),
        shallowEqual
    );
    return (
        <header className={scroll ? "header header-sticky" : "header"} >
            <div className={classes.root} >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {isLoggedIn ? (
                            <Typography variant="h6" className={classes.title}>
                                <Button color="inherit" onClick={() => history.push('/admin/dashboard/')}>Welcome Admin, <span> {user.displayName} </span></Button>
                            </Typography>

                        ) : (
                            <Typography variant="h6" className={classes.title}>
                                <Button color="inherit" onClick={() => history.push('/')}>please login</Button>
                            </Typography>
                        )
                        }
                        <Button className="ml-3" color="inherit" onClick={() => history.push('/admin/dashboard')}>Home</Button>
                        <Button className="ml-3" color="inherit" onClick={() => history.push('/admin/dashboard/addPost')}> Add Post</Button>
                        <Button className="ml-3" color="inherit" onClick={() => history.push('/admin/dashboard/posts')}> All Post</Button>
                        {isLoggedIn && (
                            <Typography variant="h6">
                                <Button className="ml-3" variant="contained" color="secondary" onClick={() => logoutUser()}>logout</Button>
                            </Typography>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </header>
    );
};

export default Navbar;
