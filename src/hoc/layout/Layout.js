import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const MainWrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 80px;
  padding-bottom: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
`;

const Layout = ({ children, loggedIn }) => (
    <>
        <ToastContainer />
        <Navbar loggedIn={loggedIn} />
        <SideDrawer loggedIn={loggedIn} />
        <MainWrapper loggedIn={loggedIn} >{children}</MainWrapper>
        {loggedIn.uid ? (
            <Footer loggedIn={loggedIn} />
        ) : (
            null
        )

        }
    </>
);

const mapStateToProps = ({ firebase }) => ({
    loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Layout);
