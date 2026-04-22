import { useContext } from "react";
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout(){
    const api = useContext(ApiContext);
    const {setUser, setBorrowersList, setGroupList} = useContext(UserInfoContext);
    const navigate = useNavigate();
    useEffect(()=>{
        api.get('/users/logout')
        .then(()=>{
            setUser(null);
            setBorrowersList([]);
            setGroupList([]);
            navigate('/', {replace : true});
        })
    }, []);
    return null;
}

export default Logout;