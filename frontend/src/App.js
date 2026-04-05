import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  let [Todolist,setTodolist]=useState();
  let [Task,setTask]=useState();
  let [Error,setError]=useState();
  let [Id,setId]=useState();
  let [toggle,settoggle]=useState(false);

  const handleId=()=>{
    setId(Id+1);
  }

  const handleToggle=()=>{
    console.log(toggle);
    settoggle(!toggle);
  }

  async function FetchData(){
    try{
    axios
    .get("http://127.0.0.1:8000/api/todo/")
    .then((res)=>setTodolist(res.data));
    }
    catch(error){
      setError(Error.message)
    }
  }

  async function AddData(Id,Task){
    try{Task &&
    axios
    .post("http://127.0.0.1:8000/api/todo/",{'task':Task,'status':true})
    .then((res)=>{setTodolist([...Todolist,{id:res.data.Id,task:Task,status:true}])});
    }
    catch(error){
       setError(error)
    }
  }

  async function DeleteData(Id) {
    try{
    axios
    .delete("http://127.0.0.1:8000/api/todo/"+Id)
    .then((res)=>{setTodolist(Todolist.filter((t)=>t.id!==Id))});
    }
    catch(error){
       setError(error)
    }
  }

  async function UpdateData(Id,Task){
    try{
    axios
    .put("http://127.0.0.1:8000/api/todo/"+Id,{id:Id,task:Task,status:true})
    .then((res)=>{Todolist.id===Id?setTodolist([...Todolist,{...Todolist,task:Task}]):setTodolist(Todolist);
    handleToggle();}
  );
    }
    catch(error){
       setError(error) 
    }
  }


  
  useEffect(()=>{
    FetchData();
  });

  let tasks=Todolist && Todolist.map((todo,index)=>{
    return(
    <div>
      {Error!=='' && Error}
      <ul>{toggle?
         <li key={todo.id}>{todo.task}{" "}
         <button onClick={()=>{handleToggle();setId(todo.id);}}>Edit</button>
         <button onClick={()=>{DeleteData(todo.id)}}>Delete</button>
         </li>:
         todo.id===Id?
         <li key={todo.id}>
          <input type='text' placeholder='type your text' onChange={(e)=>{e.preventDefault();setTask(e.target.value)}}></input>
          {Task!=='' && <button onClick={()=>{UpdateData(Id,Task)}}>Save</button>}
        </li>:
        <li key={todo.id}>{todo.task}{" "}
         <button onClick={()=>{handleToggle();setId(todo.id);}}>Edit</button>
         <button onClick={()=>{DeleteData(todo.id)}}>Delete</button>
        </li>
        }
    </ul>
    </div>
    );
    }
  );
  

  return (
    <div>
      <h1>Todo list</h1>
      <form>
        <input type='text' placeholder='type something...' onChange={(e)=>{setTask(e.target.value);}}></input>
        <button onClick={()=>{handleId();AddData(Id,Task);}}>Create</button>
      </form>
      {tasks}
    </div>
  )
}

export default App
