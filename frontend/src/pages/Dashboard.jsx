import { Search, Plus } from "lucide-react";
import BorrowerCard from "../components/BorrowerCard";
import { useContext, useEffect, useState } from "react";
import ModifyForm from "../components/ModifyForm";
import { UserInfoContext } from "../contexts/UserInfo";
import Transactions from "../components/Transactions";
import Fuse from "fuse.js";
import AddBorrowerForm from "../components/AddBorrowerForm";
import FloatingPlus from "../components/FloatingPlus";

function Dashboard() {
    const { borrowersList } = useContext(UserInfoContext);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [addBorrwer, setAddBorrower] = useState(false);
    const [searchedBorrowersList, setSearchedBorrowersList] = useState(borrowersList);
    useEffect(() => {
        setSearchedBorrowersList(borrowersList);
    }, [borrowersList])

    const fuse = new Fuse(
        borrowersList, {
        keys: ['name', 'amount']
    }
    )

    const handleSeach = (e) => {
        const searches = fuse.search(e.target.value);
        const result = searches.map((borrower) => {
            return borrower.item
        })
        setSearchedBorrowersList(result)
    }

    return (
        <>
            {selectedId ? <ModifyForm name={selectedName} curAmount={selectedAmount} _id={selectedId} cut={() => { setSelectedId(null) }} /> : ''}
            {transactionId ? <Transactions _id={transactionId} cut={() => { setTransactionId(null) }} /> : ''}
            {addBorrwer ? <AddBorrowerForm cut={()=>{setAddBorrower(false)}}/> : ''}
            <div className="flex flex-col h-[calc(100vh-55px)] px-10 shadow-primary">
                <div className="w-full flex py-3 justify-between items-center border-b-1 border-charcol-light">
                    <div className="rounded-full p-2 text-gray-400 bg-charcol-primary shadow-primary cursor-pointer hover:text-white active:scale-95" onClick={()=>{setAddBorrower(true)}}><Plus/></div>
                    <div className="relative">
                        <input type="text" className="h-8 px-3 rounded outline-none bg-charcol-light text-white text-sm caret-brand-primary" placeholder="Search" onChange={(e) => { handleSeach(e) }} />
                        <div className="absolute top-[calc(50%-10px)] right-2 text-brand-primary cursor-pointer"><Search size={20} /></div>
                    </div>
                </div>
                <div className="flex flex-wrap flex-start overflow-y-auto gap-4 my-3 justify-center sm:justify-start p-1">
                    {searchedBorrowersList.map((borrower) => {
                        return <BorrowerCard key={borrower._id} name={borrower.name} amount={borrower.amount} onClick={() => { setSelectedId(borrower._id); setSelectedName(borrower.name); setSelectedAmount(borrower.amount) }} onDoubleClick={() => { setTransactionId(borrower._id) }} />
                    })}
                </div>
            </div>
            <div className="sm:hidden" onClick={()=>{setAddBorrower(true)}}><FloatingPlus/></div>
            <div className="uppercase text-gray-600 absolute left-0 top-[50%] p-2 text-center shadow-primay font-bold leading-4 text-shadow-lg cursor-context-menu">
                K <br />
                h <br />
                a <br />
                t <br />
                a <br />
            </div>
        </>
    )
}

export default Dashboard;