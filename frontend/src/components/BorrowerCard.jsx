import Button from "../components/Button";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";
function BorrowerCard(props){
    return(
        <div className="flex flex-col items-center h-[224px] w-[220px] bg-charcol-primary rounded shadow-primary relative" onDoubleClick={props.onDoubleClick}>
            <div className="w-full p-2 text-[#c0c0c0] hover:text-white cursor-pointer flex justify-end">
                <Trash2 size={20}/>
            </div>
            <div className="h-full w-full flex flex-col justify-between items-center">
                <p className="text-brand-primary uppercase font-bold text-xl">{props.name}</p>
                <p className="text-white font-bold text-[1.5rem] tracking-wider">₹ {props.amount}</p>
                <div onClick={props.onClick}><Button text='Modify'/></div>
                <div className="h-1"></div>
            </div>
            <div className="absolute bottom-1 right-1 text-brand-primary opacity-50 cursor-pointer hover:opacity-100" onClick={props.onDoubleClick}><SquareArrowOutUpRight size={14}/></div>
        </div>
    )
}

export default BorrowerCard;