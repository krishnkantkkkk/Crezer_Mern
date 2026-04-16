import { Link, useNavigate } from 'react-router-dom';
import ladyImage from '../assets/lady.svg'
import Input from '../components/Input';
import { useContext, useState } from 'react';
import { ApiContext } from '../contexts/AxiosContext';
import { UserInfoContext } from '../contexts/UserInfo';
import { z } from 'zod';
import LoadingScreen from '../components/LoadingScreen';
function Register(){

    const [formData, setFormData] = useState({username : '', name : '', phone : '', password : ''});
    const api = useContext(ApiContext);
    const {setUser} = useContext(UserInfoContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [errorPath, setErrorPath] = useState('');

    const validate = (input) =>{
        const User = z.object({
        username : z.string().min(3, 'Length should be greater than 3'),
        name: z.string().min(3, 'Length should be greater than 3'),
        phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid phone number'),
        password : z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must not exceed 20 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character" }),
        });
        const data = User.safeParse(input);
        if(data.error){
            console.log(data.error.issues)
            setError(data.error.issues[0].message);
            setErrorPath(data.error.issues[0].path[0]);
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!validate(formData)){
            return;
        }
        setIsLoading(true);
        api.post('/users/register', formData)
        .then((data)=>{
            setUser(data);
            navigate('/dashboard');
        }).catch(()=>{
            setIsLoading(false);
        })
    }

    if(isLoading) return <LoadingScreen/>;

    return(
        <div className="h-[calc(100vh-55px)] flex">
            <div className="w-1/2 justify-center items-center hidden lg:flex">
                <img src={ladyImage} className='w-[90%]' />
            </div>
            <div className="lg:w-1/2 w-full flex justify-center items-center">
                <div className="flex flex-col w-[370px] h-[420px] bg-charcol-primary p-2.5 rounded-xl shadow-primary items-center">
                    <div className="h-1/5 w-full flex justify-center items-center">
                        <h1 className='uppercase text-white font-bold text-3xl'>Register</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-4 justify-center items-center relative">
                        <div className="w-full">
                            <Input placeholder='Username' name='username' required={true} onChange={(e)=>{setFormData(prev =>({
                                ...prev, 
                                username : e.target.value
                            }))}}></Input>
                            <div className="w-full flex justify-end h-0 text-[10px] text-orange-primary">{errorPath === 'username' ? error : ''}</div>
                        </div>
                        <div className="w-full">
                            <Input placeholder='Name' name='name' required={true} onChange={(e)=>{setFormData(prev =>({
                                ...prev, 
                                name : e.target.value
                            }))}}></Input>
                            <div className="w-full flex justify-end h-0 text-[10px] text-orange-primary">{errorPath === 'name' ? error : ''}</div>
                        </div>
                        <div className="w-full">    
                            <Input placeholder='Phone' type='number' name='phone' required={true} onChange={(e)=>{setFormData(prev =>({
                                ...prev, 
                                phone : e.target.value
                            }))}}></Input>
                            <div className="w-full flex justify-end h-0 text-[10px] text-orange-primary">{errorPath === 'phone' ? error : ''}</div>
                        </div>
                        <div className="w-full">    
                            <Input placeholder='Password' name='password' haveEye={true} required={true} onChange={(e)=>{setFormData(prev =>({
                                ...prev, 
                                password : e.target.value
                            }))}}></Input>
                            <div className="w-full flex justify-end h-0 text-[10px] text-orange-primary">{errorPath === 'password' ? error : ''}</div>
                        </div>
                        <p className='text-xs self-end text-white'>Already Registered? <Link to='/login'><span className='text-brand-primary'> Login</span></Link></p>
                        <button className='bg-brand-primary px-4 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;