import { useEffect, useState } from "react";
import manipulateDB from "../apprite/config";
import { BlogCard } from "../components";
import Container from "../components/container/Container";

export default function AllBlogs(){
    const [allblogs,setallblogs]=useState([]);
    useEffect(()=>{
        try{
            manipulateDB.getAllBlogs()
            .then((data)=>{
                if(data){
                    setallblogs(data.rows);
                    console.log(data);
                }
            })
        }catch(e){
            console.log("error is ",e);
        }
    },[])
    return (
        <Container>
            {allblogs.length>0 ? allblogs.map((blog)=>(<div key={blog.$id}><BlogCard {...blog}/></div>)) : <p>no blog available</p>}
        </Container>
    )
}