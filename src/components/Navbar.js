import { Grid, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import { CommonTextField } from './CommonComponents';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';


const Navbar = (props) => {


    const [searchValue, setSearchValue] = useState("");

    const onKeyDown = (event) => {

    }

    const onBlur = () => {

    }

    return (
        <div className="h-[70px] w-full flex absolute top-0 right-0 z-9 bg-transparent pl-[320px] pr-[20px] items-center justify-between">
            {/* search bar */}
            <Grid className="w-2/5">
                <CommonTextField
                    variant="outlined"
                    size="small"
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={searchValue}
                    fullWidth
                    placeholder={"Type to search"}
                    InputProps={{
                        style: {
                            color: '#efefef8a', borderRadius: '25px',
                            background: '#26282a',
                            '&:focus': { border: '1px solid #efefef8a' } // need to check
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon className="text-input_color" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            {/* stream */}
            <Grid className="rounded-3xl p-2 flex gap-2 bg-[#251d37] items-center cursor-pointer" onClick={() => { }}>
                <Grid className="flex rounded-[50px] p-1 items-center justify-center bg-[#9557ff]">
                    <VideocamIcon />
                </Grid>
                <span className="text-main_text text-[14px]">Start Stream</span>
            </Grid>

        </div>
    )
}

export default Navbar