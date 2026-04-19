import { useContext } from "react";
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";

function Logout(){
    const api = useContext(ApiContext);
    const {setUser, setBorrowersList, setGroupList} = useContext(UserInfoContext);
    const navigate = useNavigate();
    api.get('/users/logout')
    .then(()=>{
        setUser(null);
        setBorrowersList([]);
        setGroupList([]);
        navigate('/', {replace : true});
    })
}

export default Logout;