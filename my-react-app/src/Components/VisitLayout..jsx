import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'


const VisitLayout = () => {
    const {token} = useStateContext()

    if (token) {

        return <Navigate to='/users' />

    }
    return (

        <div>

          <Outlet />

         </div>
  )
}

export default VisitLayout
