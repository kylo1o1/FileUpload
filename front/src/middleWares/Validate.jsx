import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

const Validate = ({isAuth,children}) => {
  
    const navigate = useNavigate()

    if(!isAuth){
        toast.error('Not Logged In',{
            position:"top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
        })
        return <Navigate to={'/'}/>
    }

    return children
}
  


export default Validate