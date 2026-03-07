import React, { useEffect } from 'react'
import {BrowserRouter, Routes,Route, useLocation} from 'react-router-dom'
import Login from './Component/Login'
import Todolist from './Component/Todolist';


function App1(){
  const location=useLocation();
  useEffect(()=>{
    if (location.pathname==='/login'){
      document.body.style.backgroundColor='rgb(255, 255, 255)';
      document.body.style.backgroundSize='cover';
    }
  },[location]);
  return(     
  <Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/todolist' element={<Todolist/>}/>
  </Routes>);
}
function App() {

  return (
    <div>
      <BrowserRouter>
      <App1/>
      </BrowserRouter>
    </div>
  )
}

export default App
