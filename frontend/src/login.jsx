// LoginRegister.jsx
import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [values,setvalues]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    const handlesubmit= async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,values)
            if(res.data.status==="login success!"){
                navigate('/')
            }else{
                alert(res.data.status)
            }
        }catch(err){
            alert(res.data.status)
        }
    }


    return (
        <div className="professional-container">
            <div className="form-box">
                <h2>Login to Your Account</h2>
                <form onSubmit={handlesubmit}>
                    <input type="email" placeholder="Email" name='email' required className="input-field"
                    onChange={(e)=>{
                        setvalues({...values,email:e.target.value})
                    }} />
                    <input type="password" placeholder="Password" name='password' required className="input-field"
                    onChange={(e)=>{
                        setvalues({...values,password:e.target.value})
                    }} />
                    <button className='submit-button' type='submit'>Submit</button>
                </form>
                <p>
                    Need an account?
                    <Link to={'/register'}>Register</Link>
                </p>
                <p><Link to={'/edit'}>Reset password?</Link></p>
            </div>
            <div className="bubbles">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="bubble"></div>
                ))}
            </div>
            <div className="fishes">
                <div className="fish fish1"></div>
                <div className="fish fish2"></div>
                <div className="fish fish3"></div>
            </div>
            <div className="plants">
                <div className="plant plant1"></div>
                <div className="plant plant2"></div>
                <div className="plant plant3"></div>
            </div>
        </div>
    );
}