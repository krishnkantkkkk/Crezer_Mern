import { X } from "lucide-react";
import Input from "./Input";
import { useState } from "react";
function NewExpenseForm(props){
    const members = props.members;
    const [openMembersMenu, setOpenMembersMenu] = useState(false);
    const [paidBy, setPaidBy] = useState('');
    const handleOpenMembersMenu = () =>{
        setOpenMembersMenu(!openMembersMenu);
    }   
    const cutMemberMenu = ()=>{
        setOpenMembersMenu(false);
    }
    return(
         <>
            <div onClick={()=>{
                cutMemberMenu();
                if(!openMembersMenu) props.cut();
            }} className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-10">
            </div>
            <div className="flex flex-col max-h-[90%] h-[600px] w-[350px] bg-charcol-primary border-2 border-charcol-light p-5 rounded-xl shadow-primary items-center absolute z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={props.cut}><X/></div>
                <div className="w-full flex justify-center items-center">
                    <h1 className='uppercase text-white font-bold text-xl mb-5'>New Expense</h1>
                </div>
                <form className="w-full flex flex-col gap-3 justify-center items-center">
                    <div className="w-full">
                        <Input placeholder='Title' type='text' name='title' onChange={(e)=>{setFormData(prev =>({
                            ...prev, 
                            title : e.target.value
                        }))}}/>
                    </div>
                    <Input placeholder='Amount' type='number' name='amount' onChange={(e)=>{
                        setFormData(prev =>({
                            ...prev,
                            amount: e.target.value
                        }))
                    }}/>
                    <div className="w-full px-3 py-2 bg-charcol-dark text-sm text-gray-400 rounded flex justify-between" onClick={handleOpenMembersMenu}>
                        <p>By</p>
                        <p>{paidBy}</p>
                    </div>
                    <div className="w-full px-3 py-2 bg-charcol-dark text-sm text-gray-400 rounded flex justify-between">
                        <p>For</p>
                        <p>{members[0].name}</p>
                    </div>
                    {openMembersMenu 
                    ? 
                        <>
                            <div onClick={cutMemberMenu} className="absolute h-full w-full backdrop-blur-[1px] top-0 left-0"></div>
                            <div className="flex flex-col absolute max-h-[90%] min-w-[250px] max-w-[90%] p-5 gap-1 bg-charcol-light rounded text-white text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto">
                                {members.map((member)=>{
                                    return(
                                        <div key={member._id} className="p-2 rounded border-1 border-charcol-primary hover:text-brand-primary" onClick={()=>{setPaidBy(member.name)}}> 
                                            
                                            <p>{member.name}</p> 
                                        </div>
                                    )
                                })}
                                {members.length > 1 
                                ?
                                    <p className="p-2 rounded border-1 border-charcol-primary">Multiple</p>
                                :
                                    ''
                                }
                            </div> 
                        </>
                    : ''}
                </form>
            </div>
        </>
    )
}

export default NewExpenseForm;
