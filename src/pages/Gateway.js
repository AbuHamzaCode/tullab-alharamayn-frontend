import React, { lazy, useLayoutEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from '../config/PrivateRoutes';
import Cookies from 'js-cookie';
import Loader from '../components/Loader';
import { connect } from 'react-redux';

const Login = lazy(() => import("../pages/login/Login"));
const Users = lazy(() => import("../pages/user/Users"));

const privateRoutesData = [
    {
        path: '/login',
        element: <Login />,
        isDisabled: false,
        exact: true,
        isAuthorization: true,
        isPrivate: true
    },
    {
        path: '/',
        element: <Users />,
        isDisabled: false,
        exact: true,
        isAuthorization: true,
        isPrivate: true
    },
]
const Gateway = (props) => {

    // useLayoutEffect(() => {
    //     if (window.location.pathname === "/") {
    //         if (!token) {
    //             window.location.replace('/login')
    //         } else {
    //             window.location.replace('/')
    //         }
    //     }
    // }, [window])

    return (
        <Routes>
            <Route exact path="/login" element={props?.isLogged ? <Navigate to="/" replace /> : <Login />} />
            <Route element={<PrivateRoutes />}>
                {
                    privateRoutesData
                        .filter(item => item.isAuthorization)
                        .map((val, key) => <Route key={key} exact path={val?.path} element={val?.element} />)
                }
            </Route>
            <Route exact path="*" element={<Loader />} />
        </Routes>
    )
}
const mapStateToProps = (state) => ({
    isLogged: state.mainReducer.isLogged,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Gateway)