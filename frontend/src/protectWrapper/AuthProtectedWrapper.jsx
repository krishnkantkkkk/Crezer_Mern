import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfo";
import LoadingScreen from "../components/LoadingScreen";

function AuthProtectedWrapper({children}){
    const {user, loading} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
            navigate('/dashboard', {replace : true});
        }
    },[user])
    if(loading || user) return <LoadingScreen/>;
    return(
       children
    )
}

export default AuthProtectedWrapper;