import { createContext,useState,useContext} from "react";
import { jwtAuthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//create the context
export const AuthContext=createContext();
export const useAuth=()=>useContext(AuthContext);
//put some state in the context

//share the created context with other components
export default function AuthProvider({children}){
    const [userName,setUserName]=useState(null);
    const[isAuthorized,setIsAuthorized]=useState(false);
    const[token,setToken]=useState('');
    // async function login(userName,password){
    //     const batoken='basic '+window.btoa(userName+':'+password);
    //     try{
    //     const response=await basicAuthentication(batoken)
    //     if(response.status==200){
    //         setIsAuthorized(true)
    //         setUserName(userName)
    //         setToken(batoken);
    //         apiClient.interceptors.request.use((config)=>{
    //         config.headers.Authorization=batoken
    //         return config;
    //         })}
    //         else{
    //     setIsAuthorized(false)
    //     setUserName(null)
    //     setToken('')
    //         }}
    //     catch(error){
    //         console.log(error)
    //         setIsAuthorized(false)
    //         setUserName(null)
    //         setToken('')
    //         }
    // if(isAuthorized){
    //     return true;
    // }else{
    //     return false;
    // }

    // }
    async function login(userName,password){
        try{
        const response=await jwtAuthentication(userName,password);
        console.log(response);
        if(response.status==200){
            const jwtToken='Bearer '+response.data.token;
            setIsAuthorized(true)
            setUserName(userName)
            setToken(jwtToken);
            apiClient.interceptors.request.use((config)=>{
            config.headers.Authorization=jwtToken
            return config;
            })}
            else{
        setIsAuthorized(false)
        setUserName(null)
        setToken('')
            }}
        catch(error){
            setIsAuthorized(false)
            setUserName(null)
            setToken('')
            }
    if(isAuthorized){
        return true;
    }else{
        return false;
    }

    }
    // function login(userName,password){
    //     if(userName==="sukram" && password==="123"){
    //         setIsAuthorized(true);
    //         setUserName(userName);
    //         return true;
    //         }else{
    //           setIsAuthorized(false);
    //           setUserName(null);
    //         return false;
    //         }
    // }
    function logout(){
        setIsAuthorized(false);
    }
    return(
    <AuthContext.Provider value={{isAuthorized,setIsAuthorized,login,logout,userName,token}}>{children}</AuthContext.Provider>
    );
}