//we are maintaing authenticated route using this 

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();


    //we will take descision of redirection, 
    useEffect(() => {

        //if we have token , we will set authenticated to true
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);

            
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefrshHandler