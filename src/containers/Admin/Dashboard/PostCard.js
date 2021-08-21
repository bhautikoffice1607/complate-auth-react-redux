import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { postDel } from "../../../store/actions/postsActions";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const PostCard = ({ post, id }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const postDelete = () => {
        dispatch(postDel(post.postId));
        toast.success("Post deleted successfully!");
    }; 
    return (
        <>
        <div className="col-md-6 pb-4" key={id}>
            <div className="card">
                <CardHeader
                    className="px-2 py-3"
                    avatar={
                        <Avatar aria-label="recipe" >
                            R
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
                <div className="card-body  text-justify">
                    <h5 className="card-title">{post.post.title.toUpperCase()}</h5>
                    <p className="card-text">
                        {post.post.description.substring(0, 100)}...
                    </p>
                </div>
                <div className="card-footer bg-white">
                    <div className="d-flex align-items-center my-2 justify-content-between">
                        <p>
                            <i className="fa fa-thumbs-up"></i> Likes {post.post.likes}
                        </p>
                        <p className="bg-dark text-white py-1 px-2">{post.post.postedBy}</p>
                    </div>
                    <div className="">
                        <ButtonGroup variant="contained" fullWidth size="large" color="primary" >
                            <Button
                                onClick={() => history.push(`/post/${post.postId}`)}
                            >
                                <i className="fa fa-eye mr-2"></i>
                            </Button>
                            <Button
                                onClick={() =>
                                    history.push(`/post/${post.postId}/edit`)
                                }
                            >
                                <i className="fas fa-pencil-alt mr-2"></i>
                            </Button>
                            <Button
                                onClick={postDelete}
                            >
                                <i className="fas fa-trash mr-2"></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div >
        </>
    );
};

export default PostCard;
