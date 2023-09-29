import { Grid } from '@mui/material'
import React from 'react'
import tullab_icon from '../assets/tullab-icon.jpg';

const SideBar = (props) => {
    return (
        <div className="h-full w-[300px] absolute top-0 left-0 z-10 bg-transparent flex-col">
            <Grid className='flex w-full items-center justify-center h-25'>
                <img alt='icon' src={tullab_icon} className="max-w-full max-h-full" />
            </Grid>
        </div>
    )
}

export default SideBar