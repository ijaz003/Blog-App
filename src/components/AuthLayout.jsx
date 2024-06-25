import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({children,authenticated=true
}){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector(state=>state.auth.status);



    useEffect(()=>{
        if(authenticated && authStatus !== authenticated){
            navigate('/login')            
        }
        else if(!authenticated && authStatus !== authenticated){
            navigate('/'); 
        }
        loader(false);
    },[authenticated,navigate,authStatus])

    return(
        loader?<h1>Loading...</h1>:<>{children}</>
    )
}