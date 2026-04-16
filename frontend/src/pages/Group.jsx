import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { ApiContext } from "../contexts/AxiosContext";
import FloatingPlus from "../components/FloatingPlus";
import Button from "../components/Button";
export const Group = () =>{
    const {groupId} = useParams();
    const api = useContext(ApiContext);
    const [members, setMembers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [openAddMenu, setOpenAddMenu] = useState(false);
    const menuRef = useRef(null);
    useEffect(()=>{
        api.get(`/users/splits/fetchMembers/${groupId}`)
        .then((res)=>{
            setMembers(res.data.response.members);
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openAddMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenAddMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openAddMenu]);

    const handleOpenAddMenu = ()=>{
        setOpenAddMenu(true);
    }

    return(
        <div className="flex flex-col h-[calc(100vh-55px)] w-full p-5 items-center">
            <div className="flex justify-center items-center">
                <div className={`px-4 py-2 text-${toggle ? 'gray-400' : 'brand-primary'} bg-charcol-${toggle ? '' : 'primary'} border-1 border-charcol-primary text-sm cursor-pointer`} onClick={()=>{setToggle(false)}}>Overview</div>
                <div className={`px-4 py-2 text-${toggle ? 'brand-primary' : 'gray-400'} bg-charcol-${toggle ? 'primary' : ''} border-1 border-charcol-primary text-sm cursor-pointer`} onClick={()=>{setToggle(true)}}>Expenses</div>
            </div>

            <div className="h-full w-full max-w-[750px] p-3 overflow-y-auto">
                <div className="h-[80%] w-full flex flex-col items-center gap-1 overflow-y-auto">
                    {members.map((member)=>{
                        return(
                            <div key={member._id} className="w-[90%] flex justify-between bg-charcol-primary p-2 px-4 rounded">
                                <p className="text-white">{member.name}</p>
                                <p className={`text-${member.amount < 0 ? 'orange' : 'brand'}-primary`}>{member.amount < 0 ? '- ' : '+ '}{member.amount}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-6">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-gray-400 bg-charcol-primary w-45 text-center py-2 rounded hover:text-white cursor-pointer">Suggested Payments</p>
                        <p className="text-gray-400 bg-charcol-primary w-45 text-center py-2 rounded hover:text-white cursor-pointer">Download Summary</p>
                    </div>
                </div>
            </div>
            <div className="" onClick={handleOpenAddMenu}><FloatingPlus/></div>
            <div ref={menuRef}>
                {openAddMenu ? (
                    <div className="flex flex-col absolute bottom-5 right-5 rounded bg-charcol-primary gap-2 p-4 border-2 border-charcol-light">
                        <Button width={40} text='New Expense'/>
                        <Button width={40} text='New Payment'/>
                        <Button width={40} text='New Member'/>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}