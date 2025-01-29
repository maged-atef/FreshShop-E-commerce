import React, { useEffect, useState } from 'react'
import './Product_details.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
export default function ProductDetails() {

  var settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, autospeed: 1000,
  };
  // Extract Data From Param by Hook called useParam
  let { id, category } = useParams()
  // console.log(param.id)

  let [prod, setProd] = useState("")

  let [all, setall] = useState("")

  function GetProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data) => {
      // console.log(data)
      setProd(data.data.data)

    }).catch((error) => { console.log(error) })
  }

  function GetRelated() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data) => {
      let res = data.data.data.filter((product) => product.category.name == category)
      // console.log(res)
      setall(res)
      //  console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(function () {
    // console.log(category)
    GetProductDetails(id)
    GetRelated()

  }, [id, category])

  return <div>

    <div className="row ">
    {/* {React.createElement('h1',{className: "bg-red-300" ,color: "#fff"},'maged atef')} */}
      {prod != "" ? <div className="flex flex-wrap justify-between p-4 m-5">
        <div className=" w-screen  md:w-[40%] mb-2 ">
          {/* Slider for PRoduct imags  */}
          {/* <img src={prod.imageCover} className='w-[50%] rounded-xl ' alt="" /> */}
          <Slider {...settings}>
            {prod.images.map((imageSrc) => {
             return <div>
              <img src={imageSrc} alt="" />
            </div>
            })}
          </Slider>

        </div>

        <div className="w-full  md:w-[60%] bg-slate-100 rounded-xl mb-2 relative">
          <h2>{prod.title}</h2>
          <p className='bg-green-200 rounded-md mx-4'>{prod.description}</p>
          <p className='text-red-700'>{prod.price} EGP</p>
        
          
        </div>
         {/* {`${+prod.pric}` < 150 ? <div className='absolute bg-red-300 rounded-xl p-2'>Below 150 EGP</div> :''} */}
        <button className='btn mt-9'>add to cart</button>
      </div> : <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
      border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>}
    </div>
    <h2>Related Products</h2>
    <div className="related   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4  " >

      {all.length > 0 ? all.map((e) => {
        return <div key={e._id} className=''>
          <div className=""  >
            <Link to={`/productDetails/${e._id}/${e.category.name}`} onClick={() => {

            }}>
              <img src={e.imageCover} className='w-full rounded-xl' alt="" />
              <h2>{e.title}</h2>
            </Link>
          </div>

        </div >

      }) : ""}
    </div>
  </div>

  
}
