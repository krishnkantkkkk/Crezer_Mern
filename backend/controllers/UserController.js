import UserModel from '../models/KhataModels/UserModel.js';
import HashGenerator from '../utils/HashGenerator.js';
import VerifyPassword from '../utils/VerifyPassword.js';
import TokenGenerator from '../utils/TokenGenerator.js';

export const registerUser = async (req, res) => {
    const { name, username, phone, email, password } = req.body;
    const hasedPassword = await HashGenerator(password);
    const newUser = await UserModel.create({
        name,
        username,
        phone,
        email,
        password: hasedPassword,
    });
    req.user = {id: newUser._id, username: newUser.username};
    const token = await TokenGenerator({id: newUser._id, username: newUser.username});
    res.status(201).cookie('token', token, {httpOnly: true, secure:true, sameSite: "None",maxAge: 7 * 24 * 60 * 60 * 1000}).json({response:{ 
        message: 'User registered successfully',
        'user':{
            _id : newUser._id,
            username: newUser.username,
            name : newUser.name
        }
    }});
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.status(400).send({message: 'Invalid Username or Password'});
    }
    const verified = await VerifyPassword(password, user.password);
    if(!verified){
        return res.status(400).send({message: 'Invalid Username or Password'});
    }
    req.user = {id: user._id, username: user.username};
    const token = await TokenGenerator({id: user._id, username: user.username});
    res.status(200).cookie('token', token, {httpOnly: true, secure:true, sameSite:"None",maxAge: 7 * 24 * 60 * 60 * 1000}).json({response : {
        message: 'Login successful', 
        user:{
            _id:user._id, 
            username: user.username,
            name: user.name
        }
    }});
}

export const logoutUser = (req, res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }).send({ message: 'Logout successful' });
}

export const userProfile = async (req, res)=>{
    const user = await UserModel.findOne({_id : req.user.id});
    if(!user) return res.status(401).json({response : {
        message : 'Unauthorized',
    }})
    res.status(200).json({response : {
        message : 'User Profile',
        user : {
            _id : user._id,
            name : user.name,
            username : user.username
        }
    }})
}
