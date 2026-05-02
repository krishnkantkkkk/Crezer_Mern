import { CircleUser, LogOut,  } from "lucide-react";
import { useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfo";
import Button from "./Button";
import { Link } from "react-router-dom";
function HamburgerMenu(props){

    const {user} = useContext(UserInfoContext);

    return(
        <div className="flex flex-col gap-2 justify-between items-center w-40 p-5 fixed top-3 right-3 bg-charcol-primary rounded border-2 border-charcol-light">
            <div className="w-full h-10 rounded flex justify-center gap-1 items-center text-white">
                <CircleUser/> 
                <p className="text-brand-primary">{user?.name}</p>
            </div>
            <div className="" onClick={props.onClick}><Button text='Dashboard' redirect='/dashboard'/></div>
            <Link to='/logout'><button onClick={props.onClick} className="bg-brand-primary text-sm flex justify-center items-center w-[102.68px] py-2 rounded hover:bg-brand-dark cursor-pointer"> <LogOut size={12}/> Log Out</button></Link>
        </div>
    )
}

export default HamburgerMenu;