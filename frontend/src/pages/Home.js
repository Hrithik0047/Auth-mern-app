import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify'; //to use toast component of react

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');

    //now we can show our protected resources
    const [products, setProducts] = useState('');
    const navigate = useNavigate(); //hook to navigate

    //when component loads for the first time, we will get details from localstorage
    useEffect(() => {

        //
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])


    //this page handle logouts
    //we will achieve this by removing token and log in user
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }


    //function definition to get product, product API call
    const fetchProducts = async () => {
        try {
            const url = "https://auth-mern-app-api-ten.vercel.app/products";
            
            
            //object to pass header
            
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token') //getting token
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }

    //we will get products 
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {

                //this will show protected resource product
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
