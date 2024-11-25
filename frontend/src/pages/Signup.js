import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; //importin toastify library
import { handleError, handleSuccess } from '../utils';

function Signup() {

    //to temporarliy  save the input data
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate(); //hook to call navigate

    //this will handle when we insert somethin in our input

    //THIS IS AN API CALL
    const handleChange = (e) => {

        //capturin name and value from e.target object
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo }; //extracting signup info
        copySignupInfo[name] = value; //adding name and value in signup info
        setSignupInfo(copySignupInfo); //setting value in copySignupInfo, out signupinfo is an object
    }

    //this will prevent page from refreshing after clicking on Signup button
    const handleSignup = async (e) => {

        //this function will prevent page from refreshing
        e.preventDefault();

        //extracting information from Sign up info
        const { name, email, password } = signupInfo;

        //we will check if any of them is missing 
        if (!name || !email || !password) {

            //this calls utility.js and access it's handleError function to display message
            return handleError('name, email and password are required')
        }
        try {

            //here we can also run this locally by usin localhost route
            const url = `https://auth-mern-app-api-ten.vercel.app/auth/signup`;

            //we are calling api here, first para is url of api and second parameter is an object, and then we pass headers as objects, then we pass body, in body we pass SignupInfo object as a string
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {

                //error to display error message if any of our signup validation failed
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                    //when user inputs
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            {/* everytime we will call a function related to toast, that will render on our screen we can configure the postion accordinly*/}
            <ToastContainer />
        </div>
    )
}

export default Signup
