import React from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fire from "../../config/fire";
import Home from "./Home";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Posts from "./Posts";
import SeePost from "./SeePost";
import EditPost from "./EditPost";
import { useSelector, shallowEqual } from "react-redux";


const Dashboard = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(`path`, path);

    const { postId, isLoggedIn, userId, user } = useSelector(
        (state) => ({
            postId: state.posts.posts.postId,
            isLoggedIn: state.auth.isLoggedIn,
            userId: state.auth.userId,
            user: state.auth.user,
        }),
        shallowEqual
    );



    //logout User
    const logoutUser = () => {
        fire
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "RESET_USER" });
                toast.success("You are successfully logged out");
                history.push("/admin/login");
            })
            .catch((error) => toast.error(error.message));
    };
    // Delete user
    const deleteUser = () => {
        const user = fire.auth().currentUser;
 
        fire
            .auth()
            .delete()
            .then(() => {
                fire
                    .firestore()
                    .collection("users")
                    .doc(userId)
                    .delete();
               
                user.delete();
                dispatch({ type: "RESET_USER" });

                toast.success("You are successfully delelte");
                history.push("/admin/login");
            })
            .catch((error) => toast.error(error.message));


    };

    return (
        <>
            <Navbar logoutUser={logoutUser} />

            {isLoggedIn ? (
                <Switch>
                    <Route exact path={path}>
                        <Home logoutUser={logoutUser} deleteUser={deleteUser} />
                    </Route>
                    <Route exact path={`${path}/addPost`}>
                        <AddPost />
                    </Route>
                    <Route exact path={`${path}/posts`}>
                        <Posts />
                    </Route>
                    <Route exact path={`${path}/post/:id`}>
                        <SeePost />
                    </Route>
                    <Route exact path={`${path}/post/:id/edit`}>
                        <EditPost />
                    </Route>
                </Switch>
            )
                :
                (
                    history.push("/admin/login")
                )
            }

        </>
    );
};

export default Dashboard;
