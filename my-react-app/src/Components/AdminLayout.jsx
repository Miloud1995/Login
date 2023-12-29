import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axiosClient from "../axiosClient";

const AdminLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    // localStorage.removeItem("ACCESS_TOKEN");
    const onLogout = async () => {
        try {
            await axiosClient.post("/Logout").then(() => {
                setUser({});
                setToken(null);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashbord">Dashbord</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    {user && user.name && (
                        <div>
                            {user.name}
                            <button className="btn-logout" onClick={onLogout}>
                                Log Out
                            </button>
                        </div>
                    )}
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
