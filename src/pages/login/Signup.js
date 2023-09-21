// src/components/Signup.js
import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: '',
        password: '',
        thumbnail: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value);
            }
        })
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className='d-column'>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleInputChange}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
