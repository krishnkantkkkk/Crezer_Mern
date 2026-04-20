import { createContext } from "react";
import axios from 'axios'

export const ApiContext = createContext();

function AxiosContext({children}){
    const api = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        withCredentials: true,
    });
    return(
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    )
}

export default AxiosContext;