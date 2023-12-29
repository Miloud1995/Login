import React, { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const addUser = () => {
        axiosClient
            .post("/users", { name, email, password, password_confirmation })
            .then(() => {
                setName("");
                setEmail("");
                setPassword("");
                setPassword_confirmation("");
                navigate("/");
            })
            .catch((error) => {
                setErrors(error.response.data); // Assuming error.response.data contains error details
                console.log(error);
            });
    };

    return (
        <div>
            {errors && <div>{errors}</div>}
            <h1 style={{ textAlign: "center" }}>Add New User</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addUser();
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password Confirmation"
                    value={password_confirmation}
                    onChange={(e) => {
                        setPassword_confirmation(e.target.value);
                    }}
                />
                <button type="submit" className="btn">
                    Add
                </button>
            </form>
        </div>
    );
};

export default NewUser;
