import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGODB_URI) throw new Error("MongoDB URI is unavailable in the environment variable.");
if(!process.env.JWT_SECRET_KEY) throw new Error("JWT Secret key is unavailable in the environment variable.");
if(!process.env.FRONTEND_ORIGIN) throw new Error("Frontend Origin is unavailable in the environment variable.");

const config = {
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN
}

export default config;