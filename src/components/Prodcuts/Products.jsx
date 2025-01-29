
import { useEffect, useState } from "react";
// import Products_Details from "../Products_Details/Products_Details";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";



export default function Products() {

    let {data, isError,error, isFetched ,isLoading ,isPending } = useQuery({
        queryKey: ['GetAllProduct'],
        queryFn:()=>{
           return axios.get('https://ecommerce.routemisr.com/api/v1/products?limit=2')
        },
        staleTime:100000,
    })
    
    // console.log(data.data.data)
    if(isError){
        return <h2>{error}</h2>
    }

    if(isLoading){
        return <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
            <span>maged</span>
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    }

    // // let [counter, setCounter] = useState(1)
    // // const [first, setfirst] = useState('second')
    // let [Products, setProducts] = useState(null)


    // // function up() {
    // //     counter++;
    // //     setCounter(counter)
    // //     setfirst("maged")
    // // }
    // // async function getAll_Products() {
    // //     const res = await axios.get('https://route-ecommerce.onrender.com//api/v1/subcategories', {
    // //         headers: {

    // //         }
    // //     })
    // //     console.log(res)
    // //     return res
    // // }
    // // function down() {
    // //     if (counter <= 1) {
    // //         alert('no more down ')
    // //     } else {
    // //         counter--;
    // //         setCounter(counter)
    // //         setfirst('alexa')
    // //     }
    // // }

    // // ^ Gell All products
    // function GetProducts() {
    //     axios.get('https://ecommerce.routemisr.com/api/v1/products?limit=2').then((data) => {

    //         setProducts(data.data.data)
    //         console.log(data.data.data)


    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    // useEffect(() => {

    //     GetProducts()

    // }, [])

    return <>
        {/* <h2><i className="fa-brands fa-product-hunt"></i> Products</h2>
        <p>Staff Count: {counter}</p>
        <div className="btn flex justify-center gap-2 mb-7">
            <button onClick={up} className="bg-blue-400 rounded-md text-base">+</button>
            <button onClick={down} className="bg-red-400 rounded-md text-base">-</button>
        </div>
        <hr />
        <Products_Details number={counter} name={first} /> */}
        
        <h1 className="bg-gray-200 p-2 m-3 mt-6 rounded-md"> Products</h1>
        {data.data.data != null ? <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 px-3 gap-3 ">

            {data?.data?.data?.map((product) => {
                return <>
                    <div className="">
                    <div key={product._id} className="">
                        <Link to={`/ProductDetails/${product._id}/${product.category.name}`} target="_blank">
                            <img src={product.imageCover} className="w-full object-cover rounded-md pro" alt="" />
                            <h2>{product.title.split(' ', 3)}</h2>
                        </Link>
                        <button className="btn">add to cart</button>
                    </div>

                    </div>
                    
                </>
            })}
        </div> :
           "hay"}
    </>
}
