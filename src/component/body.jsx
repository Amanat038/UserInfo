import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AccountPage from './userinfo/UserInfo';
import RegistrationForm from './registration/registration';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <RegistrationForm />
  },
  {
    path:"account",
    element: <AccountPage />
  }
])

const Body = () => {
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;
