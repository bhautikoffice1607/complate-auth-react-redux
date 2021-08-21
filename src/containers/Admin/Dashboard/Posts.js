import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPosts } from "../../../store/actions/postsActions";
import PostCard from "./PostCard";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const Posts = ({ loggedIn }) => {
    const { postsLoading, allPosts, userId } = useSelector(
        (state) => ({
            postsLoading: state.posts.postsLoading,
            allPosts: state.posts.posts,
            userId: loggedIn.uid,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const posts = allPosts.filter((posts) => posts.post.author === userId && posts);

    useEffect(() => {
        if (postsLoading) {
            dispatch(getPosts());
        }
    }, [dispatch]);

    return (
        <div className="container mb-5 pb-5">
            <div className="row">
                <div className="col-md-12 my-3 text-right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push('/')}>Go Back</Button>
                </div>
            </div>
            <div className="row align-items-center justify-content-center">
                {postsLoading ? (
                    <h1 className="text-center">Loading Posts...</h1>
                ) : posts.length > 0 ? (
                    <>
                        {posts.map((post, id) => (
                            <PostCard post={post} key={id} id={id} />
                        ))}
                    </>
                ) : (
                    <h1 className="text-center">
                        You haven't uploaded any post{" "}
                        <Link to="/admin/dashboard/addPost" className="ml-2">
                            Create Post
                        </Link>
                    </h1>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ firebase }) => ({
    loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Posts);
