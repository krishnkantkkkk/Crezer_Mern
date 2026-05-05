import { useContext } from "react";
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";

function Logout(){
    const api = useContext(ApiContext);
    const {setUser, setBorrowersList, setGroupList, setIsLoggedIn} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        api.post('/users/logout', {})
        .then(()=>{
            setUser(null);
            setBorrowersList([]);
            setGroupList([]);
            setIsLoggedIn(false);
            localStorage.removeItem('loggedIn');
            navigate('/login', {replace : true});
        })
    }, []);
    return <Login/>;
}

export default Logout;