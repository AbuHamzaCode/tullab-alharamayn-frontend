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
         min-h-screen bg-black">
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