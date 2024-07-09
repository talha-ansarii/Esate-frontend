import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [curretnUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    const updateUser = (data) => {
        setCurrentUser(data);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(curretnUser))
    },[curretnUser])


    return (
        <AuthContext.Provider value={{curretnUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}