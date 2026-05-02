import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfo";
import LoadingScreen from "../components/LoadingScreen";

function AuthProtectedWrapper({children}){
    const {isLoggedIn, loading} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoggedIn){
            navigate('/dashboard', {replace : true});
        }
    },[isLoggedIn])
    if(loading) return <LoadingScreen/>;
    return(
       children
    )
}

export default AuthProtectedWrapper;