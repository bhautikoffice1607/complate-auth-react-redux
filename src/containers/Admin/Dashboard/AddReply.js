import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';


const AddReply = ({ id, handleReply, replyBoxSet }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reply, setReply] = useState("");

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return (
        <div key={id}>
            {!isLoggedIn && (
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control mr-1"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            )}
            <textarea
                className="form-control mb-2"
                placeholder="Reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <div>
                <Button 
                    variant="contained"
                    color="primary"
                    type="button"
                    className=" mr-2"
                    onClick={() => {
                        handleReply({ i: id, reply: { name, email, reply } });
                        replyBoxSet(false, id);
                        setName("");
                        setEmail("");
                        setReply("");
                    }}
                >
                    Reply
                </Button>
                <Button 
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => replyBoxSet(false, id)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddReply;
