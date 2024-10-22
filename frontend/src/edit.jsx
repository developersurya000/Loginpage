import React, { useState } from 'react';
import './edit.css'; // Make sure to create this CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Edit() {
    const [emaildata, setEmail] = useState({
        email: ''
    });
    const [updatedvalues, setupdatedvalues] = useState({
        password: '',
        id: ''
    })
    const requesturl='https://paypass.onrender.com';
    const [checkpass,setcheckpass]=useState('')
    const navigate=useNavigate()
    const [emailreceived, setemailreceived] = useState('')
    const [nextpage, setnextpage] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${requesturl}/checkemail`, emaildata)
            if (res.data.status === "success!") {
                setemailreceived(emaildata.email)
                setnextpage(true)
                setupdatedvalues({ ...updatedvalues, id: res.data.id })
            } else {
                alert(res.data.status)
            }
        }
        catch (err) {
            alert(res.data.status)
        }
    };

    const handlenewpass = async (e) => {
        e.preventDefault();
        if(checkpass.length<8&&updatedvalues.password.length<8){
            alert('password should have minimum 8 characters..')
        }else{
            if(checkpass===updatedvalues.password){
                try {
                    const res=await axios.put(`${requesturl}/resetpass`, updatedvalues)
                    if(res.data.status==="password reset success!"){
                        navigate('/login')
                        alert(res.data.status)
                    }else{
                        alert(res.data.status)
                    }
                }
                catch(err){
                    alert(res.data.status)
                }
            }else{
                alert("passwords does not match!")
            }
        }
    }

    return (
        <>
            {
                nextpage === true ?
                    <div className="form-container">
                        <form className="email-form" onSubmit={handlenewpass}>
                            <p>set password for email {emailreceived}</p>
                            <label>
                                New password:
                                <input
                                    type="text"
                                    placeholder="Enter new password"
                                    required
                                    onChange={(e)=>{
                                        setcheckpass(e.target.value)
                                    }}
                                    className="email-input"
                                    name='password'
                                />
                            </label>
                            <label>
                                Confirm password:
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    required
                                    onChange={(e) => {
                                        setupdatedvalues({ ...updatedvalues, password: e.target.value })
                                    }}
                                    className="email-input"
                                    name='password'
                                />
                            </label>
                            <button type="submit" className="search-button">Change</button>
                            <Link to={'/login'} className="cancel-link">Cancel</Link>
                        </form>
                    </div> : <div className="form-container">
                        <form className="email-form" onSubmit={handleSubmit}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    onChange={(e) => setEmail({ ...emaildata, email: e.target.value })}
                                    placeholder="Enter your email"
                                    required
                                    className="email-input"
                                    name='email'
                                />
                            </label>
                            <button type="submit" className="search-button">Search</button>
                            <Link to={'/login'} className="cancel-link">Cancel</Link>
                        </form>
                    </div>
            }
        </>
    );
}