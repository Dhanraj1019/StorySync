import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import authService from "../apprite/auth";
import { useSelector } from "react-redux";

export default function Protected({children,authentication=true}){
    const [loader,setloader]= useState(true);
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status);
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setloader(false);
    },[authStatus,navigate,authentication]);
    return loader ? <h1>Loading...</h1> : <>{children}</>

} 