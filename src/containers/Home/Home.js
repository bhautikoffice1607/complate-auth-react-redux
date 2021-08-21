import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPosts } from "../../store/actions/postsActions";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';

const Home = ({ loggedIn }) => {
    const history = useHistory();
    const { posts, postsLoading, isLoggedIn, userId, user } = useSelector(
        (state) => ({
            posts: state.posts.posts,
            postsLoading: state.posts.postsLoading,
            isLoggedIn: state.auth.isLoggedIn,
            userId: state.auth.userId,
            user: state.auth.user,
        }),
        shallowEqual
    );
    const fullName = user && user.displayName;
    const firstLetterName = fullName ? fullName.charAt(0) : null;


    const latestPosts = posts;

    latestPosts
        .sort((a, b) => { 
            const postA = new Date(a.post.createdAt);
            const postB = new Date(b.post.createdAt);

            if (postA < postB) return 1;
            if (postA > postB) return -1;
            return 0;
        })
        .slice(0, 5);


    const dispatch = useDispatch();

    useEffect(() => {
        if (postsLoading) {
            dispatch(getPosts());
        }
    }, [dispatch]);


    return (
        <div className="container pt-5"> 
            <div className="row">
                {postsLoading
                    ? "Loading posts"
                    : latestPosts.map((post, id) => (
                        <div className="col-md-4 col-lg-3 mb-3 px-2">
                            <div className="w-100 card mb-2" key={id}>
                                <CardHeader
                                    className="px-2 py-3"
                                    avatar={
                                        <Avatar aria-label="recipe" >
                                            {firstLetterName}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={post.post.postedBy}
                                    subheader={post.post.createdAt}
                                />
                                <img
                                    src={post.post.image}
                                    alt={post.post.title}
                                    style={{ height: '250px' }}
                                />
                                <div className="card-body p-3" style={{ height: "225px" }}>
                                    <h4 className="card-title text-capitalize">
                                        {post.post.title}
                                    </h4>
                                    <p className="card-text text-heading text-*-justify">
                                        {post.post.description.substring(0, 1).toUpperCase() +
                                            post.post.description.substring(1, 100)}
                                        ...
                                    </p>
                                    <div className="d-flex">
                                        {post.post.category.split(",").map((ctg, i) => (
                                            <p
                                                className="small bg-dark mr-2 py-1 px-2 text-white"
                                                key={i}
                                            >
                                                {ctg.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer p-0 d-flex align-items-center justify-content-between bg-white border-0">
                                    {loggedIn.uid && post.post.author === loggedIn.uid ? (
                                        <>
                                            <ButtonGroup fullWidth size="large" color="primary" >
                                                <Button fullWidth variant="contained" onClick={() => history.push(`/post/${post.postId}`)} style={{ borderRadius: 0 }}>
                                                    <i className="fa fa-eye"></i>
                                                </Button>
                                                <Button fullWidth variant="contained" onClick={() => history.push(`/post/${post.postId}/edit`)} style={{ borderRadius: 0 }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                            </ButtonGroup>
                                        </>
                                    ) : (
                                        <ButtonGroup fullWidth size="large" color="primary" aria-label="outlined primary button group">
                                            <Button fullWidth variant="contained" onClick={() => history.push(`/post/${post.postId}`)} style={{ borderRadius: 0 }}>
                                                <i className="fa fa-eye"></i>
                                            </Button>
                                        </ButtonGroup>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                <Link to="/posts" className="btn btn-dark btn-block">
                    All Posts
                </Link>
            </div>
        </div>
    );
};

const mapStateToProps = ({ firebase }) => ({
    loggedIn: firebase.auth,
});
export default connect(mapStateToProps)(Home);
