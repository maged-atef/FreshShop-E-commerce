
import { NavLink, Outlet } from "react-router-dom"
import style from './Home.module.css'
import CatSlider from "../Cat_slider/Cat_slider";
import Products from "../Prodcuts/Products";

export default function Home() {

  

    return (
        <div className="container">
            <h2 className={`${style.test}`}><i className="fa-solid fa-house"></i> Home</h2>
            <CatSlider />
            <hr />
           <Products />
            {/* <div className="row flex">
                <div className="asid w-1/4 bg-blue-300 ms-2 rounded-xl " >
                  <div className="link flex flex-col">
                  <NavLink to='Profile' className='text-left ml-2' style={{color:'green'}}>
                 <div className="inner ml-2">
                 <i className="fa-solid fa-user mr-2"></i> Profile
                 </div>
                    </NavLink>

                    <NavLink to='Group' className='text-left ml-2' style={{color:'green'}}>
                    <div className="inner ml-2">
                    <i className="fa-solid fa-layer-group mr-2"></i>Group
                    </div>
                    </NavLink>
                  </div>
                </div>
                <div className="main w-3/4 bg-yellow-200 ms-2 rounded-xl" >
                    
                    <Outlet/>
                    
                    </div>
            </div> */}
        </div>
    )
}
