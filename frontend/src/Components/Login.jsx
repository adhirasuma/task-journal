import api from './axiosInstance'
import React, { useState } from 'react'

function Login({refreshAuth}) {
    const [form,setForm]=useState({username:"",password:""});
    const [error,setError]=useState(null);
    const [message,setMessage]=useState("");
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    setLoading(true);
    setError(null);
    const response=await api.post('/api/auth/login/',form);

    localStorage.setItem("access",response.data.access)
    localStorage.setItem("refresh",response.data.refresh)

    if (refreshAuth) refreshAuth();

    alert("Login successful")
    setMessage("Login successful")
    window.location.href = "/todolist";
    }
    catch(error){
        setError("Logout failed")
    }
    finally{
        setLoading(false)
    }
    }
    
  return (
    <div className='Display'>
        <form onSubmit={handleSubmit} className='LoginCard'>
            <h1>LOGIN</h1>
            <label>Username</label>
            <input type='text' name='username' value={form.username.trim()} placeholder="Enter username" onChange={handleChange}></input>
            <label>Password</label>
            <input type='password' name='password' value={form.password.trim()} placeholder="Enter password" onChange={handleChange} ></input>
            <br></br>
            <button disabled={loading} className='Deletebutton'>{loading? "logging...":"Login"}</button>
            {error && <p className='error'>{error}</p>}
            {message && <p className='message'>{message}</p>}
        </form>
      
    </div>
  )
}

export default Login
