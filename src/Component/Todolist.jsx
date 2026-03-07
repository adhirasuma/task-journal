//Todo list v1
import React, { useState } from 'react'


function Todolist() {
    const [list,setlist]=useState([]);
    const [text,settext]=useState();
    const [toggle,settoggle]=useState(true);
    let [id,setid]=useState(0);
    const [Index,setIndex]=useState();
    const handleChange=(e)=>{
        settext(e.target.value)
    }
    const handleAdd=(e)=>{
        e.preventDefault();
        text!=="" && Add(text)
    }
    const handleId=()=>{
        setid(id+1)
        return id
    }
    const handleDelete=(index)=>{
        Delete(index);
    }
    function Add(task) {
        setlist([...list,{id:handleId(),name:task}]);
    }
    function Delete(index) {
        let a=list.filter(list=>list.id !== index);
        setlist(a);
    }
    function Edit(index) {
        settoggle(!toggle)
        setIndex(index)
        list.map(list=>list.id===index?list.name=text:list.name=list.name)
    }
    function handleSave(index){
        Edit(index);
    }
    const items=list.map((list,index)=>
    <div>
        {(toggle)?
        <li id={index}>{list.name}
            <button onClick={()=>{Edit(list.id)}}>Edit</button> 
            <button onClick={()=>{handleDelete(list.id)}}>Delete</button>
        </li>:
        <li id={index}>
            {list.id === Index ?
            <div>
            <input type='text' onChange={handleChange}></input>
            <button onClick={()=>handleSave(Index,text)}>save</button>
            </div>:
            <li id={index}>{list.name}
            <button onClick={()=>{Edit(list.id)}}>Edit</button> 
            <button onClick={()=>{handleDelete(list.id)}}>Delete</button>
        </li>}
        </li>}
    </div>)
  return (
    <div>
      <h1>TODO List</h1>
      <form>
        <input type='text' placeholder='type your task...' onChange={handleChange}></input>
        <button onClick={handleAdd}>Add</button>
      </form>
      <ul><p>{items}</p></ul>
    </div>
  );
}

export default Todolist



