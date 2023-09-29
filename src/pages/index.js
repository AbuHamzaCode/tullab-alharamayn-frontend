import React, { Suspense, lazy } from 'react'
import { Grid } from '@mui/material';
import tullab_background from '../assets/tullab-label-text.jpg';
// import Login from './login/Login';
import Gateway from './Gateway';
import Loader from '../components/Loader';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
const Login =
    lazy(() => {
        return Promise.all([
            import("./login/Login"),
            new Promise(resolve => setTimeout(resolve, 5000))
        ])
            .then(([moduleExports]) => moduleExports);
    });

const Main = (props) => {

    return (
        <Grid className="relative flex min-w-screen
         min-h-screen bg-black">
            {props.isLogged && (
                <>
                    {/* side bar */}
                    <SideBar />
                    {/* nav bar */}
                    <Navbar />
                </>
            )}
            <Suspense fallback={<Loader />}>
                <Gateway />
            </Suspense>
        </Grid>
    )
}
const mapStateToProps = (state) => ({
    isLogged: state.mainReducer.isLogged,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)