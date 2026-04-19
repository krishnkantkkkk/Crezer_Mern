import { useContext, useState } from "react";
import Input from "./Input";
import { X } from 'lucide-react'
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";

function AddBorrowerForm(props){
    const [formData, setFormData] = useState({name:'', amount : 0, memo: ''});
    const api = useContext(ApiContext);
    const {setBorrowersList} = useContext(UserInfoContext);
    const handleSubmit = (e)=>{
        e.preventDefault();
        api.post('/users/borrowers/createBorrower', formData)
        .then((res)=>{
            setBorrowersList(prev=>[res.data.response.borrowerDetail, ...prev])
            props.cut()
        })
    }
    
    return(
        <>
            <div onClick={props.cut} className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-10">
            </div>
            <div className="flex flex-col w-[350px] bg-charcol-primary border-2 border-charcol-light p-10 rounded-xl shadow-primary items-center absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={props.cut}><X/></div>
                <div className="w-full flex justify-center items-center">
                    <h1 className='uppercase text-white font-bold text-xl'>Add Borrower</h1>
                </div>
                <form className="w-full flex flex-col gap-3 justify-center items-center">
                    <div className="h-5"></div>
                    <Input placeholder='Name' type='text' name='name' onChange={(e)=>{setFormData(prev =>({
                        ...prev, 
                        name : e.target.value
                    }))}}/>
                    <Input placeholder='Amount' type='number' name='amount' onChange={(e)=>{setFormData(prev =>({
                        ...prev, 
                        amount : e.target.value
                    }))}}/>
                    <Input placeholder='Memo' type='text' name='memo' onChange={(e)=>{
                        setFormData(prev =>({
                            ...prev,
                            memo: e.target.value
                        }))
                    }}/>
                    <div className="flex w-full justify-center mt-3">
                        <button className='bg-brand-primary w-25 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark' onClick={handleSubmit}>Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBorrowerForm;