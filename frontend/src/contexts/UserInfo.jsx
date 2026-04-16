import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./AxiosContext";
export const UserInfoContext = createContext()

function UserInfo({children}){
    const api = useContext(ApiContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borrowersList, setBorrowersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    useEffect(()=>{
        api.get('/users/profile')
        .then((user)=>{
            setUser(user.data.response.user);
        })
        .catch(()=>{
            setUser(null);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])
    useEffect(()=>{
        if(user){
            api.get('/users/borrowers/fetchBorrowers')
            .then((response)=>{
                setBorrowersList(response.data.response.borrowersList.reverse());
            })
            api.get('/users/splits/fetchGroups')
            .then((res)=>{
                setGroupList(res.data.response.groups.reverse())
            })
        }
    }, [user])
    return(
        <UserInfoContext.Provider value={{user, setUser, loading, borrowersList, setBorrowersList, groupList, setGroupList}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfo;