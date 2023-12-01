import { createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Users from './Pages/Users';
import NotFound from './Pages/NotFound';
import AdminLayout from './Components/AdminLayout';
import VisitLayout from './Components/VisitLayout.';
import { Navigate } from 'react-router-dom';
import UserForm from './Pages/UserForm';


const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound/>,
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element:<Navigate to="/users"/>
            },
            {
               path: '/users',
                element: <Users />,

            },
            {
                path: '/users/newUser',
                 element: <UserForm key="userCreate"/>,

            },
            {
                path: '/users/:id',
                 element: <UserForm key="userUpdate"/>,

             },
            {
                path: '/dashbord',
                element:'/dashbord'
            }
        ]
    },
    {
        path: '/',
        element : <VisitLayout/>,
        children: [

            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <Signup/>,
            }

        ]
    }
])

export default router;
