import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import "./App.css";
import Layout from './hoc/layout/Layout';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';
import Profile from './containers/Auth/Profile/Profile';
import VerifyEmail from './containers/Auth/VerifyEmail/VerifyEmail';
import RecoverPassword from './containers/Auth/RecoverPassword/RecoverPassword';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';

import adminHome from './containers/Admin/Dashboard/Home';

import SeePost from './containers/Admin/Dashboard/SeePost';
import EditPost from './containers/Admin/Dashboard/EditPost';
import AddPost from './containers/Admin/Dashboard/AddPost';
import Posts from './containers/Admin/Dashboard/Posts';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = ({ loggedIn, emailVerified }) => {
    let routes;

    if (loggedIn && !emailVerified) {
        routes = (
            <Switch>
                <Route exact path="/verify-email" component={VerifyEmail} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/logout" component={Logout} />
                <Redirect to="/verify-email" />
            </Switch>
        );
    } else if (loggedIn && emailVerified) {
        routes = (
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/addpost" component={AddPost} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/post/:id" component={SeePost} />
                    <Route exact path={"/post/:id/edit"} component={EditPost} />
                    <Route exact path="/adminHome" component={adminHome} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/logout" component={Logout} />
                    <Route to="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        );
    } else {
        routes = (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/recover" component={RecoverPassword} />
                <Redirect to="/login" />
                <Route path="/" component={Home} />
            </Switch>
        );
    }

    return (
        <Layout>{routes}</Layout>
    );
};

const mapStateToProps = ({ firebase }) => ({
    loggedIn: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
