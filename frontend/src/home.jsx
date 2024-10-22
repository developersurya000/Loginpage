import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export function Home() {
    const requesturl='https://paypass.onrender.com';
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const [user, setuser] = useState(false)
    const [nav2, setnav2] = useState(false)
    const [message,setmessage]=useState('')
    const [name,setname]=useState('')

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setnav2(!nav2);
    };
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get(`${requesturl}/checktoken`)
                .then(res=>{
                    if(res.data.status==='success'){
                        setuser(true)
                        setname(res.data.name)
                    }else{
                        setmessage(res.data.message)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
    },[])

    const handlelogout=async ()=>{
        try{
       const res=await axios.get(`${requesturl}/logout`)
       if(res.data.status==='success'){
        window.location.reload()
       }else{
        console.log("error")
       }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            {
                user ?
                    <div className="app">
                        <header className="app-header">
                            <button className="toggle-button" onClick={toggleSidebar}>
                                {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
                            </button>
                            <h1>Dashboard</h1>
                            <button className='btn btn-danger' onClick={handlelogout}>Logout</button>
                        </header>
                        <div className="app-content">
                            {isSidebarOpen && (
                                <aside className="sidebar">
                                    <nav>
                                        <ul>
                                            <li><a href="#overview">🌊 Overview</a></li>
                                            <li><a href="#reports">📊 Reports</a></li>
                                            <li><a href="#analytics">📈 Analytics</a></li>
                                            <li><a href="#settings">⚙️ Settings</a></li>
                                        </ul>
                                    </nav>
                                </aside>
                            )}
                            <h3>Hello Welcome!... {name}...</h3>
                            <main className="main-content">
                                <section className="card">
                                    <h2>Overview</h2>
                                    <p>Some key metrics will go here.</p>
                                </section>
                                <section className="card">
                                    <h2>Reports</h2>
                                    <p>Your report data will be displayed here.</p>
                                </section>
                                <section className="card">
                                    <h2>Analytics</h2>
                                    <p>Analytics insights will be available here.</p>
                                </section>
                            </main>
                        </div>
                        <footer className="app-footer">
                            <p>&copy; 2024 Your Company</p>
                            <div className="social-media">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter-squared.png" alt="Twitter" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                                </a>
                            </div>
                        </footer>
                        <div className="bubbles">
                            {/* Create bubbles as divs */}
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="bubble"></div>
                            ))}
                        </div>
                    </div> :
                    <div className="app2">
                        <header className="app-header">
                            <button className="toggle-button" onClick={toggleSidebar}>
                                {nav2 ? 'Hide Menu' : 'Show Menu'}
                            </button>
                            <h1>Freelancer Dashboard</h1>
                        </header>
                        <div className="app-content">
                            {nav2 && (
                                <aside className="sidebar">
                                    <nav>
                                        <ul>
                                            <li><Link to={'/register'}>Register</Link></li>
                                        </ul>
                                    </nav>
                                </aside>
                            )}
                            <div className='container'>
                                <h4 className='text-secondary text-center fw-bold'>you are not logged in!</h4>
                                <h2 className='text-primary text-center fw-bolder'>please Login to access my dashboard</h2>
                                <h2 className='text-primary text-center fw-bolder'>{message}</h2>
                                <Link to={'/login'} className='btn btn-primary text-center lg'>Login Now</Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}