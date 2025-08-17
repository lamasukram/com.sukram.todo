import {apiClient} from "./ApiClient"
export const retriveUserTodosApi=(userName,token)=>{
//return axios.get("http://localhost:8080/hello-world-bean")
return apiClient.get(`/users/${userName}/todos`)
                    }
export const deleteTodoApi=(userName,id)=>{
    
    return apiClient.delete(`/users/${userName}/todos/${id}`);
    }
 export const retriveTodoApi=(userName,id)=>{
    
        return apiClient.get(`/users/${userName}/todos/${id}`);
        } 
export const updateTodoApi=(userName,id,todo)=>{
    
            return apiClient.put(`/users/${userName}/todos/${id}`,todo);
            }  
export const createTodoApi=(userName,todo)=>{
    
         return apiClient.post(`/users/${userName}/todos`,todo);
         }     
         