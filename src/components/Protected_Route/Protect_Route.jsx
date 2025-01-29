import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";



export default function Protect_Route(props) {
  
    let {token} = useContext(UserContext)
    
  return <>
           { token != null && localStorage.getItem('UserToken') !=null ? props.children : <Navigate to={'/login'}></Navigate>}
  </>
}
