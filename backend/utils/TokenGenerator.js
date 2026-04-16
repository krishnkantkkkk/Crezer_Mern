import jsonWebToken from 'jsonwebtoken';

const TokenGenerator = async (info) =>{
    const token = await jsonWebToken.sign(info, process.env.JWT_SECRET_KEY);
    return token;
}

export default TokenGenerator;