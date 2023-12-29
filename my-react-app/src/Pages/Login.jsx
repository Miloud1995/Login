import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../Contexts/ContextProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const Navigate = useNavigate();
    const { token, setUser, setToken } = useStateContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosClient.post(
                "/Login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Replace with your actual access token
                    },
                }
            );
            setEmail("");
            setPassword("");
            Navigate("/");
            setError("");
            setUser(data.user);
            setToken(data.token);
        } catch (error) {
            console.log(error.message);

            if (!error.responseHandled) {
                setError(
                    error.response.data.message ||
                        "An error occurred during login."
                );
                console.log(error);
            } else {
                if (!error.frontendErrorHandled) {
                    setError("An unexpected error occurred.");
                }
            }
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {error && (
                    <div
                        style={{
                            color: "red",
                            border: "1px solid red",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <h1 className="title">Login Into Your Account</h1>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                    />
                    <button type="submit" className="btn btn-block">
                        Login
                    </button>
                    <p className="message">
                        Not Registred ?{" "}
                        <Link to="/Signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
