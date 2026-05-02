import { useContext, useEffect } from "react"
import { UserInfoContext } from "../contexts/UserInfo"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Logout from "../pages/Logout";

function BypassProtectWrapper({children}){
    const {user, loading, setIsLoggedIn, isLoggedIn} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            setIsLoggedIn(false);
            localStorage.removeItem('loggedIn');
            navigate('/login', {replace:true});
        }
    }, [isLoggedIn])
    if(loading || !user) return <LoadingScreen/>;
    return(
        children
    )
}

export default BypassProtectWrapper;