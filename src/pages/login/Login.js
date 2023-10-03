import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import tullab_icon from '../../assets/tullab-icon-text.jpg';
import { Controller, useForm } from 'react-hook-form';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommonLoadingButton, CommonTextField } from '../../components/CommonComponents';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = (props) => {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        const formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value);
            }
        })
        props.loginAction(formDataToSend);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    return (
        <Grid container className="min-h-screen min-w-screen bg-bg_text_icon" >
            <Grid item lg={7} md={7} sm={false} xs={false} className='bg-no-repeat bg-cover bg-center' sx={{ backgroundImage: `url(${tullab_icon})` }} />
            <Grid item lg={5} md={5} sm={12} xs={12} className="text-[#fff] p-20 items-center flex justify-left">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <Grid container className="d-flex flex-column w-full gap-4">
                        <h1 className="text-[50px] text-main_text">Login</h1>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                                <CommonTextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                    ref={null}
                                    title="Username or Email"
                                    titleClassName="field_title"
                                    sx={{ borderRadius: '10px' }}
                                    error={Boolean(errors.username)}
                                    helperText={Boolean(errors.username) ? errors.username.message : ""}
                                    InputProps={{
                                        style: { color: '#fff', borderRadius: '10px', border: `1px solid ${Boolean(errors.username) ? "#d32f2f" : "#fff"}`, },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleIcon sx={{ width: '20px', color: '#fff' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                            rules={{
                                required: 'Field is required!',
                            }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                                <CommonTextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                    ref={null}
                                    title="Password"
                                    sx={{ borderRadius: '10px' }}
                                    titleClassName="field_title"
                                    error={Boolean(errors.password)}
                                    helperText={Boolean(errors.password) ? errors.password.message : ''}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        style: { color: '#fff', borderRadius: '10px', border: `1px solid ${Boolean(errors.password) ? "#d32f2f" : "#fff"}`, },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PasswordIcon sx={{ width: '20px', color: '#fff' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle passwoSrd visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityOffIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <VisibilityIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                            rules={{
                                required: 'Password is required!',
                                minLength: { value: 8, message: 'Length more than 8' }
                            }}
                        />
                        <CommonLoadingButton className="mt-2 h-[60px] rounded-[10px] text-[22px]" title={"Login"} disabled={props.common_requesting} loading={props.common_requesting} />
                    </Grid>

                </form>
            </Grid>

        </Grid>
    );
};
const mapStateToProps = state => ({
    common_error: state.mainReducer.common_error,
    common_requesting: state.mainReducer.common_requesting,
});

const mapDispatchToProps = dispatch => ({
    loginAction: body => dispatch(loginAction(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
