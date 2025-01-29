import { createContext, useState } from "react";

export let UserContext = createContext()
export default function UserTokenProvider(props){
    let [token,settoken]= useState("")
  return <UserContext.Provider value={{
            token,
            settoken,
    }}>
    {props.children}
    </UserContext.Provider>
}