import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        created_at: "",
    });

    // -----------------------------------------------GET USER FOR UPDATING------------------------------------------------------------------------------

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setLoading(true);
        await axiosClient.get(`/users/${id}`).then(({ data }) => {
            setUser(data);
            setLoading(false);
        });
    };

    {
        /* -----------------------------------------------------UPDATE FUNCTION------------------------------------------------------------------- */
    }

    const Update = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axiosClient
            .put(`/users/${user.id}`, user)
            .then(() => {
                navigate("/users");
                toast.success("User updated successfully");
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Failed to update user. Please try again.");
                console.log(error);
            });
    };
    {
        /* -----------------------------------------------------END UPDATE FUNCTION------------------------------------------------------------------- */
    }
    return (
        <div>
            {loading && (
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        color: "green",
                    }}
                >
                    loading ...
                </div>
            )}
            <h1 style={{ textAlign: "center" }}>Update User : {user.name}</h1>
            <div className="card animated fadeInDown">
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

                <form onSubmit={Update}>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => {
                            setUser({ ...user, name: e.target.value });
                        }}
                    />
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                    <input
                        type="password"
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                    />
                    <button type="submit" className="btn">
                        Save
                    </button>
                </form>
            </div>
            <ToastContainer />;
        </div>
    );
};

export default UserForm;
