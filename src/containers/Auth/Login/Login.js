import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import Message from '../../../components/UI/Message/Message';

import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/authActions';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
    password: Yup.string()
        .min(8, 'Too short.')
        .required('The passoword is required.'),
});

const Login = ({ login, loading, error, cleanUp }) => {
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
                    React Firebase Login
                    <span className="text-primary"> [Admin]</span>
                </h1>

                <div className="col-md-7 shadow p-5 mt-5 mx-auto">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            alert(JSON.stringify(values, null, 2));
                            await login(values);
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
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" />
                                </div>

                                <div className="form-group py-2">
                                    <Button
                                        fullWidth
                                        variant="contained" color="primary"
                                        disabled={!isValid || isSubmitting}
                                        loading={loading ? 'Logging in...' : null}
                                        type="submit"
                                    >
                                        login
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className="my-3"
                                        onClick={() => history.push('/signup')}>
                                        sign here
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="my-3"
                                        onClick={() => history.push('/recover')}>
                                        recover
                                    </Button>
                                    <div>
                                        <Message error show={error}>
                                            {error}
                                        </Message>
                                    </div>
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
    loading: auth.loading,
    error: auth.error,
});

const mapDispatchToProps = {
    login: actions.signIn,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
