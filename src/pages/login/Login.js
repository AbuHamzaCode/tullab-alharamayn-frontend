import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

const Login = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        props.loginAction(formDataToSend);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='d-flex d-column'>
                <input
                    type="text"
                    name="username"
                    placeholder="Username Or Email"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={props.common_requesting}>Login</button>
            </form>
        </div>
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
