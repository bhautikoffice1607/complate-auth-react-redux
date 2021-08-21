import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";

import { connect } from 'react-redux';
import Message from '../../../components/UI/Message/Message';

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/authActions';


const FILE_SIZE = 10 * 120;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const SignUpSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, 'Too short.')
        .max(25, 'Too long.')
        .required('Your first name is required.'),
    firstName: Yup.string()
        .min(3, 'Too short.')
        .max(25, 'Too long.')
        .required('Your first name is required.'),
    lastName: Yup.string()
        .min(3, 'Too short.')
        .max(25, 'Too long.')
        .required('Your first name is required.'),
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
    password: Yup.string()
        .min(8, 'The password is too short.')
        .required('The passoword is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], `Password doesn't match`)
        .required('You need to confirm your password.'),
    image: Yup
        .mixed()
        .required("A file is required")
        
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
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
                    React Firebase Register
                    <span className="text-primary"> [Admin]</span>
                </h1>

                <div className="col-md-7 shadow p-5 mt-5 mx-auto">
                    <Formik
                        initialValues={{
                            userName:'',
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            image: null
                        }}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await signUp(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form>
                                <div className="form-group py-2">
                                    <Field
                                        type="text"
                                        name="userName"
                                        className="form-control"
                                        placeholder="userName"
                                    />
                                    <ErrorMessage name="userName" />
                                </div>
                                <div className="form-group py-2">
                                    <Field
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder="firstName"
                                    />
                                    <ErrorMessage name="firstName" />
                                </div>
                                <div className="form-group py-2">
                                    <Field
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="last Name"
                                    />
                                    <ErrorMessage name="lastName" />
                                </div>
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
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                                <div className="form-group">
                                    <Field
                                        type="file"
                                        name="image"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group py-2">
                                    <Button
                                        fullWidth
                                        variant="contained" color="primary"
                                        disabled={!isValid || isSubmitting}
                                        loading={loading ? 'Logging in...' : null}
                                        type="submit"
                                    >
                                        signup
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className="my-3"
                                        onClick={() => history.push('/admin/login')}>
                                        login here
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
    signUp: actions.signUp,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

// export default Register;
