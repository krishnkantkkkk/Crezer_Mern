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
            <div className="flex flex-col w-[350px] h-[420px] bg-charcol-primary border-2 border-charcol-light p-2.5 rounded-xl shadow-primary items-center absolute z-10 top-[calc(50%-210px)] left-[calc(50%-175px)]">
                <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={props.cut}><X/></div>
                <div className="h-1/5 w-full flex justify-center items-center">
                    <h1 className='uppercase text-white font-bold text-3xl'>Add Borrower</h1>
                </div>
                <form className="w-[80%] flex flex-col gap-3 justify-center items-center">
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