import React from 'react'
import {Link , Outlet } from 'react-router-dom'
import '../App.css'

function Layout() {
  return (
    <div>
        <h1 className='head'>TODOLIST</h1>
      <nav className='navbar'>
        <Link to="/login">Login</Link>
        <Link to="/todolist">TodoList</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout
