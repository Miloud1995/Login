import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (userr) => {
        if (!window.confirm("are you sure you want to delete this user?")) {
            return;
        } else {
            axiosClient
                .delete(`/users/${userr.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Replace with your actual access token
                    },
                })
                .then(() => {
                    getUsers();
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response);
                    } else {
                        console.error(error.message);
                    }
                });
        }
    };

    const getUsers = () => {
        setLoading(true);

        axiosClient
            .get("/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Replace with your actual access token
                },
            })
            .then((response) => {
                setLoading(false);
                setUsers(response.data.data);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Server Error:", error.response.data);
                    console.error("Status Code:", error.response.status);
                    console.error("Headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error(
                        "Error setting up the request:",
                        error.message
                    );
                }
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/newUser" className="btn btn-add">
                    New User
                </Link>
            </div>
            <div className="card animated fadeInDown">
                {loading && (
                    <div style={{ textAlign: "center" }}>loading ...</div>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((userr) => (
                            <tr key={userr.id}>
                                <td>{userr.id}</td>
                                <td>{userr.name}</td>
                                <td>{userr.email}</td>
                                <td>{userr.created_at}</td>
                               

                                <td>
                                    <Link
                                        to={"/users/" + userr.id}
                                        className="btn btn-edit"
                                        style={{ marginRight: "5px" }}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(ev) => onDelete(userr)}
                                        className="btn btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
