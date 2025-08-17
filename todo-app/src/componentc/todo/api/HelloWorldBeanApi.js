import {apiClient} from "./ApiClient"
export const retriveHelloWorldBean=(userName)=>{
//return axios.get("http://localhost:8080/hello-world-bean")
return apiClient.get(`/hello-world/path-variable/${userName}`)
                }                    