import { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Layout() {
  let { token, settoken } = useContext(UserContext);
  function signOut() {
    localStorage.setItem("UserToken",null);
    settoken(null);
    
  }
  useEffect(function(){
    function gettoken(){ 
      if(localStorage.getItem('UserToken' != null)){
        settoken(localStorage.getItem('UserToken'))
      }
    }
    gettoken()

  },[])

  return (
    <>
      <div className=" w-screen h-screen flex flex-col md:flex-row ">
        
          <div className="aside w-full md:w-[20%]  bg-gray-100 bg-opacity-100 rounded-xl">
            <h2 className="  bg-gray-300 rounded-xl p-2">
           
              <i className="fa-solid fa-bars "></i> Navigation Panel
            </h2>
            <div className="links flex flex-col text-left ml-2 ">
              {token == null ? <> <NavLink to="Login" className=" p-1 cursor-pointer"> Login </NavLink>
                  <NavLink to="signup" className=" p-1 cursor-pointer"> Create New Account </NavLink>
                </> : "" }

              {token != null ?  <div className="flex flex-col">
                  <NavLink to="Home" className=" p-1 cursor-pointer">
                    Home
                  </NavLink>
                  <NavLink to="Products" className=" p-1 cursor-pointer">
                    Products
                  </NavLink>
             
                  <NavLink
                    onClick={signOut}
                    to="/"
                    className=" p-1 cursor-pointer"
                  >
                    Sign-Out
                  </NavLink>
                </div> : "" }
            </div>
          </div>

          <div className="main w-full  md:w-[80%] py-5   overflow-x-hidden ">
            <Outlet />
          </div>
       
      </div>
    </>
  );
}
