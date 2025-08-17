import {useState} from 'react'
import {BrowserRouter,Routes,Route,useNavigate, useParams,Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext';
export default function LoginComponent(){
  const useAuthContext=useAuth();
    const [userName,setUserName]=useState("sukram");
    const [password,setPassword]=useState("");
    const[showSucessMessage,setShowSucessMessage]=useState(false);
    const[showErrorMessage,setShowErrorMessage]=useState(false);
    const navigate=useNavigate();
    async function handleLogin(event){
      const login=await useAuthContext.login(userName,password)
    if(login){
    navigate(`/welcome/${userName}`);
  }else{
    setShowErrorMessage(true);
    }
    }
    return(
    <div className='Login'>
     {showErrorMessage &&<div>Authentication Failed, check your credential</div>}       
   <div className='LoginForm'>
    <label>User Name</label>
    <input type="text" name="username" value={userName} onChange={(event)=>{setUserName(event.target.value);
    }} ></input>
   </div>
   <div>
   <label>password</label>
   <input type="password" name="password" value={password} onChange={(event)=>{setPassword(event.target.value);
   }}></input>
  </div>
  <button className="Button"type="button" onClick={handleLogin}>login</button>
  </div>

    );
}