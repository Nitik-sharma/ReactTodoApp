import React, { useEffect } from "react";
import { useState } from "react";
import {HiCheck} from "react-icons/hi";
import {AiFillDelete} from "react-icons/ai"


import "./App.css";

function App() {
  const [isComplete, setisComplete] = useState(false);
  const [todo,settodo]=useState([]);
  const [Title,setTitle]=useState("");
  const [Discription,setDiscription]=useState("");
  const [completeTodo,setcompleteTodo]=useState([]);

  const handle=()=>{
    let newTodo={
      title:Title,
      discription:Discription,
    }
    let todoUpdate=[...todo];
    todoUpdate.push(newTodo);
    settodo(todoUpdate);

localStorage.setItem("todoItem",JSON.stringify(todoUpdate));
setTitle("");
setDiscription("");
  }


  // Delete Todo From Todo-List 

  const handleDelete=(index)=>{
   let DelteArr=[...todo];
   DelteArr.splice(index,1);
   
   localStorage.setItem("todoItem",JSON.stringify(DelteArr));

   settodo(DelteArr);
  
  }

// Complete Funcnality

const handleComplete=(index)=>{
let now=new Date();
let dd=now.getDate();
let mm=now.getMonth()+1;
let yy=now.getFullYear();
let hh=now.getHours();
let min=now.getMinutes();
let sec=now.getSeconds();

let completeOn=dd+"-"+mm+"-"+yy+" at "+hh+":"+min+":"+sec;
let filterArr={
  ...todo[index],
  completeOn:completeOn,
}
let updateComplete=[...completeTodo];
updateComplete.push(filterArr);
setcompleteTodo(updateComplete);
localStorage.setItem("completeTodo",JSON.stringify(updateComplete));
handleDelete(index);
}



const handleCompleteDelete=(index)=>{
    let DeleteTodo=[...completeTodo];
    DeleteTodo.splice(index,1);
    setcompleteTodo(DeleteTodo);
    localStorage.setItem("completeTodo",JSON.stringify(DeleteTodo));
}

  useEffect(()=>{
    let todoList=JSON.parse(localStorage.getItem("todoItem"));
    let getComplete=JSON.parse(localStorage.getItem("completeTodo"));
    if(todoList){
      settodo(todoList);
    }
    if(getComplete){
      setcompleteTodo(getComplete);
    }


  },[])
 
  return (
    <div>
      <h1>ToDo App </h1>
      <div className="todo-wraper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task</label>
            <input placeholder="Enter What is your task" value={Title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div className="todo-input-item">
            <label>Discription</label>
            <input placeholder="Enter What is your task Discription" value={Discription} onChange={(e)=>setDiscription(e.target.value)}/>
          </div>

          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handle}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondry-btn ${isComplete === false && "active"}`}
            onClick={() => setisComplete(false)}
          >
            Todo
          </button>
          <button
            className={`secondry-btn ${isComplete === true && "active"}`}
            onClick={() => setisComplete(true)}
          >
            Complete
          </button>
        </div>

        <div className="todo-list">
          
           {
            isComplete===false &&    todo.map((item,index)=>{
               console.log(item);
              return(
                <div className="todo-list-item" key={index}>
          <div>
               <h3>{item.title}</h3>
               <p>{item.discription}</p>
             </div>
             <div>
               <AiFillDelete className="icon" onClick={()=>handleDelete(index)}/>
               <HiCheck className="check-icon" onClick={()=>handleComplete(index)}/>
               
 
             </div>
             </div>
              )
            })
           }
           {
            isComplete===true &&    completeTodo.map((item,index)=>{
              console.log(item);
             return(
               <div className="todo-list-item" key={index}>
         <div>
              <h3>{item.title}</h3>
              <p>{item.discription}</p>
              <p><small>completeOn{"  :   "+item.completeOn}</small></p>
            </div>
            <div>
              <AiFillDelete className="icon" onClick={()=>handleCompleteDelete(index)}/>
              
              

            </div>
            </div>
             )
           })
           }
          
        </div>
      </div>
    </div>
  );
}

export default App;
