import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";

import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/authActions';

const RecoverSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
});

const RecoverPassword = ({ error, loading, sendEmail, cleanUp }) => {
    const history = useHistory();

    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-center font-weight-bolder">
                    React Firebase Recover Password
                    <span className="text-primary"> [Admin]</span>
                </h1>

                <div className="col-md-6 shadow p-5 mt-5 mx-auto">
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={RecoverSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await sendEmail(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form>
                                <div className="form-group py-2">
                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email" />
                                </div>
                                <div className="form-group py-2">
                                    <Button
                                        fullWidth
                                        variant="contained" color="primary"
                                        disabled={!isValid || isSubmitting}
                                        loading={loading ? 'Sending recover email...' : null}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className="my-3"
                                        onClick={() => history.push('/login')}>
                                       login
                                    </Button> 
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({
    loading: auth.recoverPassword.loading,
    error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
    sendEmail: actions.recoverPassword,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoverPassword);