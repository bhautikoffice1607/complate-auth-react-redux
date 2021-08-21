import React from 'react';
import styled from 'styled-components';

import { useHistory } from "react-router-dom";

import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Button from '@material-ui/core/Button';



const FooterWrap = styled.footer` 
    background-color: var(--color-mainDark); 
    width: 100%; 
    position: fixed;
    bottom: 0;
    width: 100%;
`;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(0),
            borderRadius: 0,
        },
        '& a': {
            borderRadius: 0,
        }
    },

}));

const Footer = ({ loggedIn }) => {
    const classes = useStyles();
    const history = useHistory();


    return (
        <FooterWrap>
            <div className={classes.root}>
                <ButtonGroup fullWidth size="large" color="primary" aria-label="outlined primary button group">
                    <Button fullWidth variant="contained" onClick={() => history.push('/')} style={{ borderRadius: 0 }}>
                        <HomeIcon />
                    </Button>
                    <Button fullWidth variant="contained" onClick={() => history.push('/posts')}>
                        <SearchIcon />
                    </Button>
                    <Button fullWidth variant="contained" onClick={() => history.push('/addPost')}>
                        <AddIcon />
                    </Button>
                    <Button fullWidth variant="contained" onClick={() => history.push('/posts')}>
                        Admin All Post
                        <FavoriteBorderIcon />
                    </Button>
                    {loggedIn.uid ? (
                        <Button fullWidth variant="contained" onClick={() => history.push('/profile')} style={{ borderRadius: 0 }}>
                            <span className="pr-3">{loggedIn.displayName}</span>
                            <AccountCircleSharpIcon />
                        </Button>
                    ) : (
                        <Button fullWidth variant="contained" onClick={() => history.push('/profile')} style={{ borderRadius: 0 }}>
                            <AccountCircleSharpIcon />
                        </Button>
                    )}


                </ButtonGroup>
            </div>
        </FooterWrap>
    );
};

export default Footer;
