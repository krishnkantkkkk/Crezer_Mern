import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./AxiosContext";
export const UserInfoContext = createContext();

function UserInfo({children}){
    const api = useContext(ApiContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchedBorrowers, setFetchedBorrowers] = useState(false);
    const [fetchedGroups, setFetchedGroups] = useState(false);
    const [borrowersList, setBorrowersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn'));
    useEffect(()=>{
        if(isLoggedIn){
            api.get('/users/profile')
            .then((user)=>{
                setUser(user.data.response.user);
            })
            .catch(()=>{
                setUser(null);
            })
        }
        setLoading(false);
    }, [])
    useEffect(()=>{
        if(isLoggedIn){
            api.get('/users/borrowers/fetchBorrowers')
            .then((response)=>{
                setBorrowersList(response.data.response.borrowersList.reverse());
            })
            .finally(()=>{
                setFetchedBorrowers(true);
            })

            api.get('/users/splits/fetchGroups')
            .then((res)=>{
                setGroupList(res.data.response.groups.reverse())
            })
            .finally(()=>{
                setFetchedGroups(true);
            })
        }
    }, [user])
    return(
        <UserInfoContext.Provider value={{user, setUser, loading, borrowersList, setBorrowersList, groupList, setGroupList, fetchedBorrowers, fetchedGroups, isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfo;