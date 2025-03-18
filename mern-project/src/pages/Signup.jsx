import React from "react";
import "./Signup.css";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomInput from "./CustomInput";
import axios from "axios";
import { message } from "antd";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords must match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData, "format")
    };
    console.log(formData, "format")

    const handleSubmit = async (e) => {
        console.log(e, "eeee")
        e.preventDefault();

        if (validateForm()) {
            try {
                const userData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,

                    email: formData.email,
                    password: formData.password,

                };

                const response = await axios.post(
                    "http://localhost:3000/api/auth/register",
                    userData
                );

                setFormData({
                    firstName: "",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                console.log("Signup successful!", response.data);
                message.success("Signup  successful!", 2);
                //message.success(response.data?.message || "Signup successful!", 2);
            } catch (error) {
                console.log(error.response.data.message, "error")
                message.error("A user with that email already exists.", 3);
                console.error("Signup failed:", error.response?.data || error.message);

            }
        }
    };



    return (





        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {/* First Name & Last Name */}
                    <div className="name-flex">
                        <div className="input-wrapper">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="input-field"
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="input-wrapper">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="input-field"
                            />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}

                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}

                    </div>

                    <div className="input-wrapper">
                        <label>Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}

                    </div>

                    <div className="input-wrapper">
                        <label>Confirm Password</label>
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <span className="toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                    </div>

                    <button type="submit" className="auth-btn">Sign Up</button>

                    <p className="auth-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>



    );
}

export default Signup;
