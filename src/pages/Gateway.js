import React, { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import { connect } from 'react-redux';

const Login = lazy(() => import("../pages/login/Login"));
const Lessons = lazy(() => import("../pages/user/Lessons"));
// const Login =
//     lazy(() => {
//         return Promise.all([
//             import("../pages/login/Login"),
//             new Promise(resolve => setTimeout(resolve, 2000))
//         ])
//             .then(([moduleExports]) => moduleExports);
//     });


const Gateway = (props) => {

    const routesData = [
        {
            path: '/auth',
            element: <Login />,
            isAlreadyLogged: props.isLogged
        },
        {
            path: '/',
            element: <Lessons />,
        },
    ]

    return (
        <Routes>
            <Route element={<Outlet />}>
                {routesData.filter(el => !el?.isAlreadyLogged)
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