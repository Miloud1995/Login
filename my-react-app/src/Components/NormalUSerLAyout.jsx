import React from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const NormalUSerLAyout = () => {
    const { user } = useStateContext();
    if (token) {
        if (!user.is_admin) {
            return <Navigate to="/home" />;
        }
    }
    return <div>NormalUSerLAyout</div>;
};

export default NormalUSerLAyout;
