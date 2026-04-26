import React from 'react'
import Login from './Components/Login'
import TodoList from './Components/TodoList'
import Register from './Components/Register'
import { BrowserRouter,Routes,Route} from 'react-router-dom' 
import HomePage from './Components/HomePage'
import Layout from './Components/Layout'


function App() {
  const isAuth = () => {
    return localStorage.getItem("access");
    
  };
  
  return(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route element={<Layout/>}>
        <Route path='/login' element={<Login />}/>
        <Route path='/todolist' element={<TodoList isAuth={isAuth()}/>}/>
        <Route path='/register' element={<Register />}/>
      </Route>
      <Route path='*' element={<h1>404 Page not found</h1>}/>
    </Routes>
    </BrowserRouter>
  </div>)
}

export default App
