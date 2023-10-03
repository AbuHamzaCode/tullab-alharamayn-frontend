import React, { Suspense } from 'react'
import { Grid } from '@mui/material';
import Gateway from './Gateway';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';


const Main = (props) => {

    return (
        <Grid className="relative flex min-w-screen
         min-h-screen" sx={{
                background: "linear-gradient(90deg, rgba(32,32,33,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)"
            }}>
            {window.location.pathname !== "/auth" && (
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