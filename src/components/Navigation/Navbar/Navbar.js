import React from 'react'; 

// import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({ 
    header: {
        position: "fixed", 
        top: "0",
        left: "0",
        width: "100%",
        height: "80px",
        zIndex:"99",

    },
}));

const Navbar = ({ loggedIn }) => {
    const classes = useStyles(); 
    return (
        <header className={classes.header}>
            <div className="container-fuild">
                <div className="row"> 
                    {/* <Logo /> */}
                    <NavItems loggedIn={loggedIn} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
