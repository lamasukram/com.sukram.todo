import './TodoApp.css'
import {BrowserRouter,Routes,Route,useNavigate, useParams,Link, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import LoginComponent from "./LoginComponent"
import ErrorComponent from "./ErrorComponent"
import WelcomeComponent from "./WelcomeComponent"
import FooterComponent from'./FooterComponent'
import HeaderComponent from "./HeaderComponent"
import TodoListComponent from './TodoListComponent'
import TodoComponent from './TodoComponent'
import AuthProvider from './security/AuthContext'
import { useAuth } from './security/AuthContext';
function AuthenticatedRoute({children}){
  const useAuthContext=useAuth();
    if(useAuthContext.isAuthorized){
      return(children)
    }else{
      return(<Navigate to="/" />)
    }
}
export function TodoApp(){
    return(
  <>
  <AuthProvider>
  <BrowserRouter>
  <HeaderComponent></HeaderComponent>
  <Routes>
    <Route path="/" element={<LoginComponent />}></Route>
    <Route path="/login" element={<LoginComponent></LoginComponent>}></Route>
    <Route path="/welcome/:userName" element={<AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>}></Route>
    <Route path="/todos" element={<AuthenticatedRoute><TodoListComponent/></AuthenticatedRoute>}></Route>
    <Route path="/todo/:id" element={<AuthenticatedRoute><TodoComponent /></AuthenticatedRoute>}></Route>
    <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}></Route>
    <Route path="*" element={<ErrorComponent/>}></Route>
  </Routes>
  <FooterComponent></FooterComponent>
  </BrowserRouter>
  </AuthProvider>
  </>
    );
}


