import React, { useEffect, useState } from 'react'

import '../App.css'

function HomePage() {
  const [count,setCount]=useState(10);
  const text="TODOLIST";

useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev - 1);
  }, 1000);
  if (count === 0){
    window.location.href='/login';
  }
  return () => clearInterval(timer);

}, [count]);
  
  return (
    <div className='Display'>
      <h1>{text}</h1>
      <p>Redirecting in {count} seconds...</p>
    </div>
  )
}

export default HomePage
