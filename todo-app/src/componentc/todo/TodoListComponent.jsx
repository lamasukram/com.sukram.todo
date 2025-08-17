import { useEffect, useState } from "react";
import { retriveUserTodosApi,deleteTodoApi} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TodoListComponent(){
    const today=new Date();
    const useAuthApi=useAuth();
    const userName=useAuthApi.userName;
    const navigate=useNavigate();
    const token=useAuthApi.token;
    const futureDate=new Date(today.getFullYear()+12,today.getMonth(),today.getDay());
    //const todos=[];
    const[todos,setTodos]=useState([]);
    const[message,setMessage]=useState(null);
    useEffect(()=>refreshTodos(),[]);
    function refreshTodos(){
        retriveUserTodosApi(userName,token)
            .then((res)=>{
             setTodos(res.data);
             })
            .catch((err)=>console.log(err))
             .finally(()=>console.log("clear"));
        }
    function deleteTodo(id){
       deleteTodoApi(userName,id,token)
       .then((res)=>{
        setMessage(`Id ${id}is deleted`);
        refreshTodos();})
       .catch((err)=>console.log(err))
        .finally(()=>console.log("clear"));
    }
    function updateTodo(id){
      navigate(`/todo/${id}`);
   }
   function addTodo(){
    navigate(`/todo/${-1}`);
   }
      return(
     <div className='container'>
      <h1>Things you want to do</h1>
      <div>
        Todo Details
        {message && <div className="alert alert-warning">{message}</div>}
        <table className="table">
          <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
            <th>TargetDate</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
          </thead>
          <tbody>
          {
            todos.map(todo=>
               <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Updata</button></td>
                </tr>)
          }
          </tbody>
        </table>
        <button className="btn btn-success m-1" onClick={addTodo}>AddTodo</button>
      </div>
     </div>
  
      );
  }