import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import './Profile.css'
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/authActions';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// tab start

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
// tab end

const ProfileSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Your first name is required.')
        .min(3, 'Too short.')
        .max(25, 'Too long.'),
    firstName: Yup.string()
        .required('Your first name is required.')
        .min(3, 'Too short.')
        .max(25, 'Too long.'),
    lastName: Yup.string()
        .required('Your last name is required.')
        .min(3, 'Too short.')
        .max(25, 'Too long.'),
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
    password: Yup.string()
        .min(8, 'The password is too short.')
        .required('The passoword is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], `Password doesn't match`)
        .required('You need to confirm your password.'),
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({
    firebase,
    editProfile,
    loading,
    error,
    loadingDelete,
    errorDelete,
    deleteUser,
    cleanUp,
    loggedIn
}) => {


    // tab
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //tab


    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp]);

    const [modalOpened, setModalOpened] = useState(false);
    const [profileModal, setProfileModal] = useState(false);

    if (!firebase.profile.isLoaded) return null;


    return (
        <>
            <section className="profile">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="profile-content text-center">
                                <div className="avatar">
                                    <img src="https://source.unsplash.com/random" alt={loggedIn.displayName} className="img-raised rounded-circle img-fluid" />
                                </div>
                                <div className="deatils p-4">

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setProfileModal(true)}>
                                        Edit Profile
                                    </Button>
                                    <h3 className="name">{loggedIn.displayName}</h3>
                                    <h6>Designer</h6>
                                    {firebase.profile.image}
                                    {firebase.profile.userName  }

                                    <div className="icon py-3">
                                        <IconButton aria-label="dribbble" color="primary" className="p-3 mx-2">
                                            <a href="#" className="btn-dribbble">
                                                <i className="fab fa-dribbble"></i>
                                            </a>
                                        </IconButton>
                                        <IconButton aria-label="twitter" className="p-3 mx-2">
                                            <a href="#" className="btn-twitter">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </IconButton>
                                        <IconButton aria-label="instagram" color="secondary" className="p-3 mx-2">
                                            <a href="#" className="btn-pinterest">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </IconButton>
                                    </div>
                                    <div className="description">
                                        <p>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p>
                                    </div>
                                </div>
                                <div className={classes.root}>
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                            variant="fullWidth"
                                        >
                                            <Tab label="Item One" {...a11yProps(0)} />
                                            <Tab label="Item Two" {...a11yProps(1)} />
                                            <Tab label="Item Three" {...a11yProps(2)} />
                                            <Tab label="Item Four" {...a11yProps(3)} />
                                            <Tab label="Item Five" {...a11yProps(4)} />
                                            <Tab label="Item Six" {...a11yProps(5)} />
                                            <Tab label="Item Seven" {...a11yProps(6)} />
                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={value} index={0}>
                                        Item One
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        Item Two
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        Item Three
                                    </TabPanel>
                                    <TabPanel value={value} index={3}>
                                        Item Four
                                    </TabPanel>
                                    <TabPanel value={value} index={4}>
                                        Item Five
                                    </TabPanel>
                                    <TabPanel value={value} index={5}>
                                        Item Six
                                    </TabPanel>
                                    <TabPanel value={value} index={6}>
                                        Item Seven
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="profile-dialog">
                <Dialog
                    open={profileModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setProfileModal(false)}
                    className="pb-3"
                    fullWidth
                >
                    <div className="card shadow p-5">
                        <Formik
                            initialValues={{
                                userName: firebase.profile.userName,
                                firstName: firebase.profile.firstName,
                                lastName: firebase.profile.lastName,
                                email: firebase.auth.email,
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={ProfileSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                // edit the profile here
                                await editProfile(values);
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
                                            placeholder="lastName"
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
                                    <div className="form-group py-2">
                                        <Button
                                            fullWidth
                                            variant="contained" color="primary"
                                            disabled={!isValid || isSubmitting}
                                            loading={loading ? 'Editing...' : null}
                                            type="submit"
                                        >
                                            Edit
                                        </Button>
                                        <div>
                                            <Message error show={error}>
                                                {error}
                                            </Message>
                                        </div>
                                        <div>
                                            <Message success show={error === false}>
                                                Profile was updated!
                                            </Message>
                                        </div>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className="my-3"
                                            onClick={() => setModalOpened(true)}>
                                            Delete my account
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className="my-3"
                                            onClick={() => setProfileModal(false)}>
                                            close
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Dialog
                        open={modalOpened}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setModalOpened(false)}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        className="pb-3"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            <Heading bold size="h2" noMargin>Delete your account</Heading>
                        </DialogTitle>
                        <DialogContent className="pb-5">
                            <Heading size="h5">
                                Do you really want to delete your account?
                            </Heading>
                            <ButtonGroup
                                fullWidth
                                aria-label="contained primary button group"
                                variant="contained"
                            >
                                <Button color="secondary" onClick={() => setModalOpened(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={() => deleteUser()}>
                                    Delete Agree
                                </Button>
                            </ButtonGroup>
                        </DialogContent>
                        <div>
                            <Message severity="error" error show={errorDelete}>
                                {errorDelete}
                            </Message>
                        </div>
                    </Dialog>
                </Dialog>
            </div>
        </>
    );
};


const mapStateToProps = ({ firebase, auth }) => ({
    firebase,
    loading: auth.profileEdit.loading,
    error: auth.profileEdit.error,
    loadingDelete: auth.deleteUser.loading,
    errorDelete: auth.deleteUser.error,
    loggedIn: firebase.auth,
});

const mapDispatchToProps = {
    editProfile: actions.editProfile,
    cleanUp: actions.clean,
    deleteUser: actions.deleteUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);