import { Search, Plus } from "lucide-react";
import { useContext, useState } from "react";
import SplitCard from "../components/SplitCard";
import SplitsGroupForm from "../components/SplitsGroupForm";
import { UserInfoContext } from "../contexts/UserInfo";
import { useNavigate } from "react-router-dom";
import FloatingPlus from "../components/FloatingPlus";
import LoadingScreen from "../components/LoadingScreen";
function Splits(){
    const [groupFormOpen, setGroupFormOpen] = useState(false);
    const {groupList, fetchedGroups} = useContext(UserInfoContext);
    const navigate = useNavigate();
    if(!fetchedGroups) return <LoadingScreen/>
    return(
        <>
            {groupFormOpen ? <SplitsGroupForm cut={()=>{setGroupFormOpen(false)}}/> : ''}
            <div className="flex flex-col h-[calc(100vh-55px)] px-10 py-1 shadow-primary">
                <div className="w-full flex py-3 justify-between items-center border-b-1 border-charcol-light">
                    <div className="rounded-full p-2 text-gray-400 bg-charcol-primary shadow-primary cursor-pointer hover:text-white active:scale-95" onClick={()=>{setGroupFormOpen(true)}}><Plus/></div>
                    <div className="relative">
                        <input type="text" className="h-8 px-3 rounded outline-none bg-charcol-light text-white text-sm caret-brand-primary" placeholder="Search" onChange={(e) => { handleSeach(e) }} />
                        <div className="absolute top-[calc(50%-10px)] right-2 text-brand-primary cursor-pointer"><Search size={20} /></div>
                    </div>
                </div>
                <div className="flex flex-wrap flex-start overflow-y-auto gap-4 my-3 justify-center sm:justify-start">
                    {groupList.map((group)=>{
                        return <SplitCard key={group._id} groupId={group._id} openGroupTab={()=>{navigate(`/splits/${group._id}`)}} name={group.name} amount={group.amount}/>
                    })}
                </div>
            </div>
            <div className="sm:hidden" onClick={()=>{setGroupFormOpen(true)}}><FloatingPlus/></div>
            <div className="uppercase text-gray-600 absolute left-0 top-[50%] p-2 text-center shadow-primay font-bold leading-4 text-shadow-lg cursor-context-menu">
                S <br />
                p <br />
                l <br />
                i <br />
                t <br />
            </div>
        </>
    )
}

export default Splits;