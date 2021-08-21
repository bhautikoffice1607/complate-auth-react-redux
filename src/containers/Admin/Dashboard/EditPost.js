import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getPosts,
    postUpdate,
} from "../../../store/actions/postsActions";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const { posts, postsLoading } = useSelector(
        (state) => ({
            posts: state.posts.posts,
            postsLoading: state.posts.postsLoading,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const currentPost = posts.find((post) => post.postId === id && post);

    useEffect(() => {
        if (postsLoading) {
            dispatch(getPosts());
        }
        if (currentPost) {
            setTitle(currentPost.post.title);
            setCategory(currentPost.post.category);
            setDescription(currentPost.post.description);
        }
    }, [dispatch, currentPost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !category || !description) {
            return toast.warning("Please fill in all fields!");
        }

        if (description.length < 100) {
            return toast.info("Description should be of atleast 100");
        }
        if (title.trim().split(" ").length < 2) {
            return toast.info("Title should be of atleast 2 words");
        }

        const data = { title, description, category };
        dispatch(postUpdate(currentPost.postId, data));
        toast.success("Post Updated Successfully!!");
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12 py-2">
                    <h2 className="text-center">Edit Post</h2>
                </div>
                {currentPost ? (
                    <div className="col-md-7 shadow mx-auto p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="category"
                                    placeholder="Categories [followed with commas for multiple]"
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <textarea
                                    placeholder="Enter Description"
                                    className="form-control"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <ButtonGroup fullWidth size="large" color="primary" aria-label="outlined primary button group">
                                <Button
                                    fullWidth
                                    variant="contained" 
                                    type="submit" 
                                    value="Update Post"
                                    style={{ borderRadius: 0 }}
                                >Update Post</Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    type="button"
                                    onClick={() => history.push("/admin/dashboard/posts")}
                                    style={{ borderRadius: 0 }}
                                >
                                    Go Back
                                </Button>
                            </ButtonGroup>
                        </form>
                    </div>
                ) : (
                    <div className="col-md-12">
                        {postsLoading ? (
                            <h1 className="text-center">Post Loading...</h1>
                        ) : (
                            <h1 className="text-center">
                                Error 404 : Post With Id {id} Not Exists
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditPost;
