import { useContext, useEffect } from "react"
import { UserInfoContext } from "../contexts/UserInfo"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function BypassProtectWrapper({children}){
    const {user, loading} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/register', {replace : true})
        }
    }, [user])
    if(loading || !user) return <LoadingScreen/>;
    return(
        children
    )
}

export default BypassProtectWrapper;