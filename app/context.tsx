//Acceder a la biblioteca de "context" de react native
import {Children, createContext, useState} from 'react'

export const MyContext = createContext(
    //este es el estado o valores iniciales del objeto context
    {
        loginData:{},
        setLoginData:()=>{},
    }
);

export const MyContextProvider = ({children})=>{
    const [loginData, setLoginData] = useState({});

    return (
        <MyContext.Provider value={{loginData, setLoginData}}>
            {children}
        </MyContext.Provider>
    );
}