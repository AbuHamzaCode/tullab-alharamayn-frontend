import { Grid } from '@mui/material'
import React from 'react'
import tullab_icon from '../assets/tullab-icon.jpg';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { Link, useLocation } from 'react-router-dom';

const navigationData = [
    {
        location: "/",
        title: "Lessons",
        icon: <PlayLessonIcon />,
    },
    {
        location: "/playlist",
        title: "Playlist",
        icon: <SubscriptionsIcon />,
    },
    {
        location: "/authors",
        title: "Authors",
        icon: <RecordVoiceOverIcon />,
    },
]

const SideBar = (props) => {
    const location = useLocation();

    return (
        <div className="h-full w-[300px] absolute top-0 left-0 z-10 flex-col pt-[30px]"
            style={{ background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(38,38,38,1) 100%, rgba(13,17,18,1) 100%)" }}>
            <Link to={"#"} className="flex w-full items-center justify-center h-[100px] mb-[20px]">
                <img alt='icon' src={tullab_icon} className="max-w-full max-h-full rounded-[10px]" />
            </Link>
            <Grid className="flex flex-col gap-4 py-[20px] pl-[30px] pr-[10px] w-full">
                {navigationData.map((val, key) => (
                    <Link key={key} to={val.location}
                        style={{ textDecoration: 'none' }}
                        className={`flex gap-4 ${location.pathname === val.location ? "text-main_text" : "text-[#7e7f80]"} text-[25px] items-center cursor-pointer w-full`}
                    >
                        {val.icon}
                        <label className="cursor-pointer">{val.title}</label>
                    </Link>
                ))}
            </Grid>

        </div>
    )
}

export default SideBar