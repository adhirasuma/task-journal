import React, { useState } from 'react'
import '.././Component/Login.css'
import { useNavigate} from 'react-router-dom'

function Login() {
    const pass={id:'0000',name:'Adhira',email:'adhirasuma@gmail.com',phone:'9947344210',address:'4/410A joseph road,calicut'}
    const a=['AB12','CD34','EF56','GH78','IJ90'];
    const [name,setname]=useState('hi');
    const [bool,setbool]=useState(false);
    const [pw,setpw]=useState('');
    const [error,setError]=useState('');
    const [capcha,setcapcha]=useState(0);
    const [capcha1,setcapcha1]=useState(a[0]);
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/todolist",{state:"hello"});
        console.log(name);
    }
    const handleClick2=()=>{
      navigate("/Catalogue")
    }
    const handlename=(e)=>{
        setname(e.target.value)
    }
    const handlepw=(e)=>{
        setpw(e.target.value)
    }
    const handlecapcha=(e)=>{
        setcapcha(e.target.value)
    }
    const handlecapcha1=(e)=>{
        e.preventDefault();
        setcapcha1(a[Math.floor(Math.random()*a.length)])
    }
    const handleClick1=(e)=>{
      e.preventDefault();
      setError('Invalid capcha,password or username')
      setbool(true)
      
    }
  return (
    <div>
      <div>
        <form className='card'>
        <label>Enter Username</label>
        <input type='text' placeholder='type username' onChange={handlename} required></input>
        
        <label>Enter Password</label>
        <input type='text' placeholder='type password' maxLength='4' onChange={handlepw} required></input>
        
        <label>CAPCHA</label>
        <input type='text' value={capcha1} readOnly></input>

        <label>Enter Capcha</label>
        <input type='text' placeholder='type capcha' maxLength='4' onChange={handlecapcha}></input>

        <button className='button' onClick={handlecapcha1}>Change capcha value</button>

        <button className='button' onClick={(capcha===capcha1 && pass.name===name && pass.id===pw)? handleClick:handleClick1}>Submit</button>
        <p>{(bool)? error:undefined}</p>
        <p>New user? <button className='button' onClick={handleClick2} >Create Account</button></p>
        
      </form>
      </div>
    </div>
  )
}

export default Login
