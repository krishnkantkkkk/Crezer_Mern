import { useContext } from "react";
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";

function Logout(){
    const api = useContext(ApiContext);
    const {setUser} = useContext(UserInfoContext);
    const navigate = useNavigate();
    api.get('/users/logout')
    .then(()=>{
        setUser(null);
        navigate('/', {replace : true});
    })
}

export default Logout;