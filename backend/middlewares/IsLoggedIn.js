import jsonWebToken from 'jsonwebtoken';

export const IsLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = await jsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
};