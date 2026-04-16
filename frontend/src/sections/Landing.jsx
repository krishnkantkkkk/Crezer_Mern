import { useContext } from "react";
import Button from "../components/Button";
import { UserInfoContext } from "../contexts/UserInfo";

function Landing(){
    const {user} = useContext(UserInfoContext);
    return(
        <section className="h-[calc(100vh-55px)] rounded-2xl shadow-primary flex flex-col lg:p-20 lg:flex-row">
            <div className=" text-4xl leading-12 lg:text-5xl font-extrabold p-5 lg:leading-15 text-center lg:text-left sm:text-center text-left lg:w-1/2">
                <div className="text-white">
                    Welcome to <span className="text-brand-primary font-merienda font-[900]">CREzER</span><br /> 
                    Your Gateway to <br /> 
                    Keep Credit <br />
                    Records. <br />
                    <span className="text-brand-primary">16</span><br />
                    Users
                </div>
                <Button text={user ? 'Dashboard' : 'Get Started'} redirect='/register'/>
            </div>
            <div className="w-1/2 p-5 hidden sm:flex">
                
            </div>
        </section>
    )
}

export default Landing;