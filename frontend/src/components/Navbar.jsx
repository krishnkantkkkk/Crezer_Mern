import { useContext, useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.svg'
import Button from './Button';
import { Link, useLocation } from 'react-router-dom';
import { UserInfoContext } from '../contexts/UserInfo';
import { Menu } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';

function Navbar(){
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const {isLoggedIn} = useContext(UserInfoContext);

    const [hanmburgerOpened, setHamburgerOpened] = useState(false);

    const menuRef = useRef(null);

    const handleHamburger = () =>{
        setHamburgerOpened(!hanmburgerOpened);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hanmburgerOpened && menuRef.current && !menuRef.current.contains(event.target)) {
                setHamburgerOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hanmburgerOpened]);

    return(
        <nav className="flex bg-charcol-darker justify-between items-center h-[55px] w-full sticky top-0 p-[10px] z-100 shadow-primary">
            <div className="flex justify-center items-center">
                <Link to='/'>
                    <div className="flex justify-center items-center">
                        <img src={logo} className='h-[40px]' alt="logo"/>
                        <span className='font-merienda text-white font-[900] text-2xl'>CREzER</span>
                    </div>
                </Link>
                {isHome && (
                    <div className="flex items-center ml-10 text-white gap-5 hidden sm:flex">
                        <p className='cursor-pointer hover:text-brand-primary'>Home</p>
                        <Link to='/splits'><p className='cursor-pointer hover:text-brand-primary'>Splits</p></Link>
                        <p className='cursor-pointer hover:text-brand-primary'>About</p>
                        <p className='cursor-pointer hover:text-brand-primary'>Contact</p>
                    </div> 
                )}
            </div>

            <div className="flex items-center gap-4">
                {isAuthPage || isLoggedIn ? '' : <Button text='Get Started' redirect='/login'/>}
                {isLoggedIn && (
                    <div ref={menuRef} className="transition duration-300 ease-in-out relative">
                        {hanmburgerOpened ? (
                            <HamburgerMenu onClick={handleHamburger}/> 
                        ) : (
                            <div className="text-white cursor-pointer hover:text-brand-primary" onClick={handleHamburger}>
                                <Menu/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;