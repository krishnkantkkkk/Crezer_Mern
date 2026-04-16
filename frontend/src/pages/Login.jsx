import { Link, useNavigate } from 'react-router-dom';
import ladyImage from '../assets/lady.svg'
import instagram from '../assets/instagram-icon.svg'
import gmail from '../assets/gmail-icon.svg'
import twitter from '../assets/twitter-icon.svg'
import github from '../assets/github-icon.svg'
import linkedin from '../assets/linkedin-icon.svg'
import Input from '../components/Input';
import { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../contexts/AxiosContext';
import { UserInfoContext } from '../contexts/UserInfo';
function Login(){
    const [formData, setFormData] = useState({username : '', password: ''});
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const {setUser} = useContext(UserInfoContext);
    const [error, setError] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        api.post('/users/login', formData).then((data)=>{
            setUser(data.data.response.user);
            navigate('/dashboard');
        }).catch((err)=>{
            if(err.status === 400) setError('Invalid Username or Password');
        })
    }

    return(
        <div className="h-[calc(100vh-55px)] flex">
            <div className="w-1/2 justify-center items-center hidden lg:flex">
                <img src={ladyImage} className='w-[90%]' />
            </div>
            <div className="lg:w-1/2 w-full flex justify-center items-center">
                <div className="flex flex-col w-[370px] h-[420px] bg-charcol-primary p-2.5 rounded-xl shadow-primary items-center">
                    <div className="h-1/5 w-full flex justify-center items-center">
                        <h1 className='uppercase text-white font-bold text-3xl'>Login</h1>
                    </div>
                    <form method='post' onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-4 justify-center items-center relative">
                        <div className="text-xs text-orange-primary h-0 absolute -top-5 z-10">{error}</div>
                        <Input placeholder='Username' type='text' name='username' required={true} onChange={(e)=>{setFormData(prev =>({
                            ...prev, 
                            username : e.target.value
                        }))}}/>
                        <Input placeholder='Password' type='password' required={true} haveEye={true} name='password' onChange={(e)=>{
                            setFormData(prev =>({
                                ...prev,
                                password: e.target.value
                            }))
                        }}/>
                        <p className='text-xs self-end text-white'>New User?<Link to='/register'> <span className='text-brand-primary'>Register</span></Link></p>
                        <button className='bg-brand-primary px-4 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark'>Login</button>
                    </form>
                    <div className='flex justify-between w-[80%] mt-20'>
                        <img src={instagram} alt="" className='h-[30px] cursor-pointer hover:scale-105 active:scale-95'/>
                        <img src={twitter} alt="" className='h-[30px] cursor-pointer hover:scale-105 active:scale-95'/>
                        <img src={gmail} alt="" className='h-[30px] cursor-pointer hover:scale-105 active:scale-95'/>
                        <img src={github} alt="" className='h-[30px] cursor-pointer hover:scale-105 active:scale-95'/>
                        <img src={linkedin} alt="" className='h-[30px] cursor-pointer hover:scale-105 active:scale-95'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;