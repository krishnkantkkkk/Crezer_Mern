import { useContext, useState } from "react";
import Input from "./Input";
import { X } from 'lucide-react'
import { ApiContext } from "../contexts/AxiosContext";
import { UserInfoContext } from "../contexts/UserInfo";

function ModifyForm(props){
    const [formData, setFormData] = useState({amount : 0, memo: '', borrower:props._id, transactionType:''});
    const api = useContext(ApiContext);
    const {setBorrowersList} = useContext(UserInfoContext);
    const [error, setError] = useState('');
    const onBorrowed = (e)=>{
        e.preventDefault();
        formData.transactionType = 'Borrowed';
        api.post('/users/borrowers/makeTransaction', formData)
        .then((res)=>{
            const id = res.data.response.updatedBorrowerDetail._id;
            const newAmount = res.data.response.updatedBorrowerDetail.amount;
            setBorrowersList(prev =>
                prev.map(borrower =>
                    borrower._id === id
                        ? { ...borrower, amount: newAmount }
                        : borrower
                )
            );
            props.cut()
        })
    }
    const onPaid = (e)=>{
        e.preventDefault();
        formData.transactionType = 'Paid';
        api.post('/users/borrowers/makeTransaction', formData)
        .then((res)=>{
            const id = res.data.response.updatedBorrowerDetail._id;
            const newAmount = res.data.response.updatedBorrowerDetail.amount;
            setBorrowersList(prev =>
                prev.map(borrower =>
                    borrower._id === id
                        ? { ...borrower, amount: newAmount }
                        : borrower
                )
            );
            props.cut()
        }).catch((err)=>{
            if(err.status === 400){
                setError('Not a valid amount to pay');
            }
        })
    }
    return(
        <>
            <div onClick={props.cut} className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-10">
            </div>
            <div className="flex flex-col w-[350px] h-[420px] bg-charcol-primary border-2 border-charcol-light p-2.5 rounded-xl shadow-primary items-center absolute z-10 top-[calc(50%-210px)] left-[calc(50%-175px)]">
                <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={props.cut}><X/></div>
                <div className="h-1/5 w-full flex justify-center items-center">
                    <h1 className='uppercase text-white font-bold text-3xl'>Modify</h1>
                </div>
                <form className="w-[80%] flex flex-col gap-3 justify-center items-center">
                    <div className="w-full h-20 flex flex-col justify-center items-center">
                        <div className="w-full flex justify-between">
                            <p className="text-white">Name</p>
                            <p className="text-brand-primary">{props.name}</p>
                        </div>
                        <div className="w-full flex justify-between">
                            <p className="text-white">Current Amount</p>
                            <p className="text-brand-primary">₹ {props.curAmount}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Input placeholder='Amount' type='number' name='amount' onChange={(e)=>{setFormData(prev =>({
                            ...prev, 
                            amount : e.target.value
                        }))}}/>
                        <div className="w-full flex justify-end h-0 text-[10px] text-orange-primary">{error ? error : ''}</div>
                    </div>
                    <Input placeholder='Memo' type='text' name='memo' onChange={(e)=>{
                        setFormData(prev =>({
                            ...prev,
                            memo: e.target.value
                        }))
                    }}/>
                    <div className="flex w-full justify-between mt-3">
                        <button className='bg-brand-primary w-25 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark' onClick={onPaid}>Paid</button>
                        <button className='bg-brand-primary w-25 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark' onClick={onBorrowed}>Borrowed</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ModifyForm;