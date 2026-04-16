import { X } from 'lucide-react'
import TransactionBlock from './TransactionBlock';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../contexts/AxiosContext';

function Transactions(props){
    const [transactions, setTransactions] = useState([]);
    const api = useContext(ApiContext);
    useEffect(()=>{
        api.get('/users/borrowers/fetchTransactions/' + props._id)
        .then((res)=>{
            setTransactions(res.data.response.transactions.reverse());
        })
    }, [])
    return(
        <>
            <div onClick={props.cut} className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-10">
            </div>
            <div className="flex flex-col w-[350px] h-[420px] bg-charcol-primary border-2 border-charcol-light p-5 rounded-xl shadow-primary items-center absolute z-10 top-[calc(50%-210px)] left-[calc(50%-175px)]">
                <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={props.cut}><X/></div>
                <div className="w-full flex justify-center items-center border-b-1 border-charcol-light">
                    <h1 className='uppercase text-white font-bold text-xl'>Records</h1>
                </div>
                <div className="flex flex-col gap-1 w-full h-full overflow-y-auto p-1 mt-2">
                    {transactions.map((transaction)=>(
                        <TransactionBlock
                            key={transaction._id}
                            memo={transaction.memo || transaction.transactionType}
                            amount={transaction.amount}
                            transactionType={transaction.transactionType}
                            _id = {transaction._id}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Transactions;