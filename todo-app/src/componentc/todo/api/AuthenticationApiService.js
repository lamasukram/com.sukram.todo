import { apiClient } from "./ApiClient"
export const basicAuthentication=(token)=>{
    //return axios.get("http://localhost:8080/hello-world-bean")
    return apiClient.get(`/basicAuth`,{
        headers:{
            Authorization:token
        }
    })
             }
export const jwtAuthentication=(username,password)=>{
                //return axios.get("http://localhost:8080/hello-world-bean")
                console.log(username,password);
                return apiClient.post(`/authenticate`,{username,password})                         }