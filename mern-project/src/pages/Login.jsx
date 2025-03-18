import React from "react";
import "./Login.css";

import { Navigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomInput from "./CustomInput";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch } from "react-redux";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const validateForm = () => {
        let newErrors = {};


        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.email.includes("@")) newErrors.email = "Invalid email format";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            try {
                const userData = {
                    email: formData.email,
                    password: formData.password
                };

                const response = await axios.post(
                    "http://localhost:3000/api/auth/login",
                    userData
                );
                message.success("Login successful!", 2);
                console.log("Login successful!", response.data.token);

                const { token, user } = response.data; // Assuming API returns user details

                console.log(response.data, "uuuu")
                dispatch(loginSuccess({ token, user }));
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
            catch (error) {
                console.log(error.response?.data?.message, "err")
                message.error(error.response?.data?.message || "Invalid username or password!.", 3);
                console.error("Invalid username or password", error.response?.data || error.message);

            }
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">

                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <CustomInput
                            name="email"
                            // type="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        {console.log(errors, "email")}
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>



                    <div className="input-group password-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <CustomInput
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>


                    <button type="submit" className="login-btn">Login</button>

                    <p className="register-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

