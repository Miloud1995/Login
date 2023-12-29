import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const VisitLayout = () => {
    const { token, user } = useStateContext();

    if (token) {
        console.log(user.is_admin);

        // Redirect to "/users" if the user is an admin, otherwise redirect to "/home"
        return <Navigate to={user.is_admin ? "/users" : "/home"} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default VisitLayout;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useStateContext } from "../Contexts/ContextProvider";

// const VisitLayout = () => {
//     const { token, user } = useStateContext();

//     if (token && user.is_admin === true) {
//         console.log(user.is_admin);
//         return <Navigate to="/users" />;
//     }

//     if (token && user.is_admin === false) {
//         console.log(user.is_admin);
//         return <Navigate to="/home" />;
//     }

//     return (
//         <div>
//             <Outlet />
//         </div>
//     );
// };

// export default VisitLayout;
