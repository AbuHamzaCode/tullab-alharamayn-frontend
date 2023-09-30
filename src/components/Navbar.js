import { Avatar, Fade, Grid, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { CommonTextField } from './CommonComponents';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { connect } from 'react-redux';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Settings, Logout } from '@mui/icons-material';
import { logoutAction } from '../pages/redux/actions';
import Cookies from 'js-cookie';

const Navbar = (props) => {


    const [searchValue, setSearchValue] = useState("");
    const [userMenu, setUserMenu] = useState(null);
    const isOpen = Boolean(userMenu);

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
            {/* current user */}
            <Grid className="bg-transparent flex gap-4 text-main_text items-center ">
                <Avatar alt="user" src="" />
                <Grid className="flex flex-col ">
                    <span className="text-[15px]">{props.user?.fullName}</span>
                    <small className="text-[13px] text-[orange]">{props.user?.isAdmin ? "Admin" : ""}</small>
                </Grid>
                <IconButton onClick={(event) => setUserMenu(event.currentTarget)} className="text-main_text hover:bg-[#dddddd]">
                    {userMenu ?
                        <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                    }
                </IconButton>
            </Grid>


            {/* user menu */}
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={userMenu}
                open={isOpen}
                onClose={() => setUserMenu(null)}
                TransitionComponent={Fade}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        border: '1px solid #E8E8E8',
                        borderRadius: '10px',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderTop: '1px solid #E8E8E8',
                            borderLeft: '1px solid #E8E8E8'
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setUserMenu(null)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Setting
                </MenuItem>
                <MenuItem onClick={() => [props.logoutAction(Cookies.get("twj")), setUserMenu(null)]}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

        </div>
    )
}
const mapStateToProps = state => ({
    common_error: state.mainReducer.common_error,
    common_requesting: state.mainReducer.common_requesting,
    user: state.mainReducer.user
});

const mapDispatchToProps = dispatch => ({
    logoutAction: (token) => dispatch(logoutAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)