import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
 
import Button from '@material-ui/core/Button'; 
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';

import * as actions from '../../../store/actions';
 

const VerifyEmail = ({ sendVerification, error, loading, cleanUp }) => {
    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 p-2 mt-5 mx-auto">
                    <div className="card p-4">
                        <Heading noMargin bold size="h1">
                            Verify your email
                        </Heading>
                        <Heading  size="h4">
                            Go to your email inbox, and please verify your email.
                        </Heading>
                        <Button
                            fullWidth
                            variant="contained" color="primary"
                            loading={loading ? 'Sending email...' : null}
                            disabled={loading}
                            onClick={() => sendVerification()}
                            className="mb-5"
                        >
                            Re-send verification email
                        </Button>
                        <div>
                            <Message  error show={error}>
                                {error}
                            </Message>
                        </div>
                        <div>
                            <Message  success show={error === false}>
                                Profile was updated!
                            </Message>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = ({ auth }) => ({
    loading: auth.verifyEmail.loading,
    error: auth.verifyEmail.error,
});

const mapDispatchToProps = {
    sendVerification: actions.verifyEmail,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyEmail);