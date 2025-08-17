import {BrowserRouter,Routes,Route,useNavigate, useParams,Link} from 'react-router-dom'
import { useState } from 'react';
import { retriveHelloWorldBean } from './api/HelloWorldBeanApi';
export default function WelcomeComponent(){
    const{userName}=useParams();
    const[message,setMessage]=useState(null);
    function callHelloWorld(){
    retriveHelloWorldBean("sukram")
        .then((res)=>{
         setMessage(res.data.message)})
        .catch((err)=>console.log(err))
         .finally(()=>console.log("clear"));
    }
      return(
          <>
     <div className='welcomeComponent'>
      <h1>Welcome {userName}</h1>
      <div>
      Your todos-<Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorld}>Goto HelloApi</button>
      </div>
      <div className="text-messsage">{message}</div>
     </div>
    </>
  
      );
  }