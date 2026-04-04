import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);

// React Component 
export default function UserContextProvider(props) {
    const [userLogin, setuserLogin] = useState(null);
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setuserLogin(localStorage.getItem('userToken'));
        }

    }, [])

    return <UserContext.Provider value={{ userLogin, setuserLogin, token }}>
        {props.children}
        {/* Right Now This is The App */}
    </UserContext.Provider>
}