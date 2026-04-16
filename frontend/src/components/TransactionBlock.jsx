import Notebook from "../assets/note_down.svg";
import Wallet from "../assets/deposit.svg";
function TransactionBlock(props){
    let dateTime = '';
    if(props._id){
        const timestamp = parseInt(props._id.substring(0, 8), 16) * 1000;
        const date = new Date(timestamp);
        const dateTimeArray = date.toISOString().split('T');
        let rightDate = dateTimeArray[0].split('-');
        rightDate = `${rightDate[2]}-${rightDate[1]}-${rightDate[0]}`;
        let rightTime = dateTimeArray[1].split(':');
        let hour = rightTime[0]*1;
        let min = rightTime[1]*1;
        if(min > 30) hour++;
        hour = (hour+5)%24;
        min = (min + 30)%60;
        rightTime = `${hour}:${min}`;
        dateTime = rightDate + ' ~ ' + rightTime;
    }
    return(
        <div className="w-full flex justify-between bg-charcol-darker rounded p-2">
            <div className="h-full flex flex-col justify-around text-white">
                <p className="text-sm">{props.memo}</p>
                <p className='text-[10px] text-gray-400'>{dateTime}</p>
            </div>
            <div className="h-full flex items-center">
                <p className={`flex justify-center items-center ${props.transactionType === 'Paid' ? 'text-brand-primary' : 'text-orange-primary'}`}>
                    ₹ {props.amount}
                </p>
                <img className='h-4 ml-1' src={props.transactionType === 'Paid' ? Wallet : Notebook} alt="icon"/>
            </div>
        </div>
    )
}

export default TransactionBlock;