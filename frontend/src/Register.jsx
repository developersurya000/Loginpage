// LoginRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [values, setvalues] = useState({
    name: '',
    email: '',
    password: ''
  })
  // console.log(values)
  const navigate=useNavigate()
  const handlesubmit= async (e)=>{
    e.preventDefault();
    if(values.password.length<8){
      alert("password should have minimum 8 characters")
    }else{
      try{
        const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,values)
        if(res.data.status==="Email already exists!"){
          alert(res.data.status)
        }else{
          if(res.data.status==="success!"){
              navigate('/login')
          }else{
            alert("server error!")
          }
        }
        }
        catch(err){
          console.log(err)
          alert("data not sent")
        }
    }
  }

  return (
    <div className="professional-container">
      <div className="form-box">
        <h2>Create a New Account</h2>
        <form onSubmit={handlesubmit}>
          <input type="email" placeholder="Email" name='email' required className="input-field"
            onChange={(e) => {
              setvalues({ ...values, email: e.target.value })
            }} />
          <input type="password" placeholder="Password" name='password' required className="input-field"
          onChange={(e)=>{
            setvalues({...values,password:e.target.value})
          }} />
          <input type="text" placeholder="Full Name" name='name' required className="input-field"
          onChange={(e)=>{
            setvalues({...values,name:e.target.value})
          }} />
          <button className='submit-button'>Register</button>
        </form>
        <p>Already have an account?
          <Link to={'/Login'}>Login</Link>
        </p>
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