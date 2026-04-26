import React, { useEffect, useState } from 'react'
import api from './axiosInstance';
import '../App.css'

function TodoList() {

  let [Todolist,setTodolist]=useState([]);
  let [Task,setTask]=useState("");
  let [error,setError]=useState(null);
  let [editId, setEditId] = useState(null);
  let [loading,setLoading]=useState(true);
  

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login"; 
  };

  const fetchData=async()=>{
    try{
      setLoading(true);
      const response=await api.get("/api/todo/");
      setTodolist(response.data);
    } catch (error){
        console.log(error.response?.data);
      }
    finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData();
  },[]);

  const AddData=async(Task)=>{
    setError(null);
  if (!Task.trim()) {
    setError("Task cannot be empty");
    return;
  }
    try{
      await api.post("/api/todo/",{task:Task,status:true});
      setTask("");       
      fetchData();
    } catch (error) {
      console.log(error.response?.data|| "Failed to load data");
    }
  }

  const DeleteData=async(Id)=> {
    try{
    await api.delete(`/api/todo/${Id}/`)
    fetchData();
    }
    catch(error){
       setError(error.response?.data || "Delete failed")
    }
  }

  const UpdateData=async(Id,Task)=>{
    try{
    await api.put(`/api/todo/${Id}/`,{task:Task,status:true})
    fetchData();
    setEditId(null);}
    catch(error){
       setError(error.response?.data || "Update failed") 
    }
  }

  if (loading) {
  return <p>Loading...</p>;
}


  let tasks = Todolist.map((todo) => (
  <div key={todo.id}>
   <ul>
    {todo.id === editId ? (
      <li >
        <input
          type="text"
          value={Task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={(e) => {
          e.preventDefault();
          UpdateData(todo.id, Task);
        }}disabled={!Task.trim()} 
        className='Editbutton'>
          Save
        </button>
      </li>
    ) : (
      <li>
        <input type='checkbox'></input>
        {todo.task}
        <button onClick={() => {
          setEditId(todo.id);
          setTask(todo.task);
          setError(null);
        }} className='Deletebutton'>
          Edit
        </button>
        <button onClick={() => DeleteData(todo.id)} className='Deletebutton'>
          Delete
        </button>
      </li>
    )
    }
    </ul>
  </div>
));



  return (
    <div>
      <form>
        <input type='text' placeholder='type something...'  onChange={(e)=>{setTask(e.target.value);}} disabled={!localStorage.getItem("access")} className='search'></input>
        <button onClick={(e)=>{e.preventDefault(); AddData(Task);}} disabled={!Task.trim() || !localStorage.getItem("access")} className='Deletebutton'>Create</button>
        <button onClick={handleLogout} disabled={!localStorage.getItem("access")} className='Deletebutton'>Logout</button>
      </form>
      { Todolist.length === 0 && !loading && <p style={{margin:'10px'}}>No tasks yet...</p>}
      {tasks}
      {error && <p className='error'>{error}</p>}
    </div>
  );
}

export default TodoList
