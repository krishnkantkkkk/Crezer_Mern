import { Trash2, TrendingUp } from "lucide-react";
function SplitCard(props){
    return(
        <div className="flex flex-col items-center h-[224px] w-[220px] bg-charcol-primary rounded shadow-primary relative">
            <div className="text-gray-400 hover:text-white cursor-pointer absolute top-2 right-1">
                <Trash2 size={20}/>
            </div>
            <div className="h-full w-full flex justify-center items-center">
                <div className="w-full flex flex-col text-center">
                    <p className="text-brand-primary font-bold text-xl p-2">{props.name}</p>
                    <p className="text-white font-bold text-[1.5rem] tracking-wider">₹ {props.amount}</p>
                    <p className="text-[10px] text-gray-500">Total Expenditure</p>
                </div>
            </div>
            <div className="absolute bottom-1 right-2 text-brand-primary opacity-50 cursor-pointer hover:opacity-100" onClick={props.openGroupTab}><TrendingUp size={14}/></div>
        </div>
    )
}

export default SplitCard;