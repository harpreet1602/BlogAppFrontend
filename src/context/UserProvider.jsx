import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth";
import userContext from "./userContext";

function UserProvider({children}) {
    const [user,setUser] = useState({
        name: 'Harpreet'
    });

    useEffect(()=>{
        // setUser({
        //     name: "Harpreet Singh"
        // })
        
        setUser(getCurrentUser);
    },[])
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;