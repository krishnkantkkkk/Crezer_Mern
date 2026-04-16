import { createContext } from "react";
import axios from 'axios'

export const ApiContext = createContext();

function AxiosContext({children}){
    const api = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true,
    });
    return(
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    )
}

export default AxiosContext;