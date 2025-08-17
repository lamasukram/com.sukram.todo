import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useEffect, useState } from "react";
import { Formik,Form,Field, ErrorMessage } from "formik";
import moment from "moment";
export default function TodoComponent(){
    const navigate=useNavigate();
    const useAuthContext=useAuth();
    const userName=useAuthContext.userName;
    const token=useAuthContext.token;
    const{id}=useParams();
    const[description,setDescription]=useState("");
    const[targetDate,setTargetDone]=useState("");
   useEffect(()=>{retriveTodo()},[id])
    function retriveTodo(){
     if(id!=-1){   
     retriveTodoApi(userName,id)
     .then(res=>{
        setDescription(res.data.description)
        setTargetDone(res.data.targetDate)
     })
     .catch(err=>console.log(err))
     .finally(()=>console.log("clear"))}
    }
    function onSubmit(values){
        const todo={
            id:id,
            username:userName,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }
        if(id==-1){
            createTodoApi(userName,todo)
            .then(res=>navigate(`/todos`))
        .catch(err=>console.log(err))
        .finally(()=>console.log("clear"));
        }else{
        updateTodoApi(userName,id,todo)
        .then(res=>navigate(`/todos`))
        .catch(err=>console.log(err))
        .finally(()=>console.log("clear"));
        }

    }
    function validate(values){
        let errors={
        }
    if(values.description.length<5){
        errors.description="enter atlest 6 character";
    }
    if(values.targetDate==null || values.targetDate==""){
        errors.targetDate="enter valid date";
    }
    return errors;
    }

    return(
     <div className="container"> 
    <h1>Enter Todo Details</h1>
    <Formik initialValues={{description,targetDate}} enableReinitialize={true} onSubmit={onSubmit} 
    validate={validate}>
    {
        (prop)=>(
           <Form>
            <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
            <fieldset className="form-group">
             <label>Description</label>
             <Field type="text" className="form-control" name="description"></Field>   
            </fieldset>
            <fieldset className="form-group">
             <label>Target Date</label>
             <Field type="date" className="form-control" name="targetDate"></Field>   
            </fieldset>
            <div><button className="btn btn-success m-4" type="submit">Save</button></div>
            </Form>
        )
    }
    </Formik>   
    </div>  

    );
}