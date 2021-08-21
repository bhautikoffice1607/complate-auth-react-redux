import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { shallowEqual, useSelector } from "react-redux";
import { connect } from 'react-redux';


const Home = ({ logoutUser, deleteUser, loggedIn }) => {
    const history = useHistory();

    const { isLoggedIn, user } = useSelector(
        (state) => ({
            isLoggedIn: loggedIn,
            user: state.auth.user,
        }),
        shallowEqual
    );
    return (
        <div className="container-fluid">
            <div className="row justify-content-center my-5 py-4">
                <div className="col-md-8">
                    <div class="card" >
                        <div class="card-body">
                            <h1 className="text-center text-dark my-3">Hello {loggedIn.displayName}</h1>
                            {isLoggedIn && (
                                <div className="profile text-white font-weight-bold ml-auto mr-5">
                                    <div className="d-flex justify-content-center pt-3">
                                        <Button variant="contained" color="primary" onClick={() => history.push("/")} className="mr-3">Home</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteUser()}>delete User</Button>

                                        <Button variant="outlined" color="secondary" className=" ml-3" onClick={() => logoutUser()}>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ firebase }) => ({
    loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Home);
