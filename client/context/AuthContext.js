import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext();


export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error ('use autContext must be inside a authContextProvider')
    }

    return context
}