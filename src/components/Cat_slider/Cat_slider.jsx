import axios from 'axios';
import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';


export default function CatSlider() {

  let { data, isLoading, isError, error, isFetched, isPending } = useQuery({
    queryKey: ['categoryList'],
    queryFn: () => {
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')}
    
    // staleTime: 1000, //امتي الداتا تبقي قديمه 
    // rety: 3,            //خطأ المحاولات 3 مرات 
    // retryDelay: 3000,   //الوقت اللي يحاول بعده لو حصل 
    // refetchInterval: 100000, // refetch interval
    // refetchIntervalInBackground : true, //refetch in background
    // refetchOnWindowFocus: true , //refetch on window focus
    // gcTime:4000 , // garpage collecter 
    ,select: (data)=> data.data.data, //return data instead of data.data.data
    staleTime:100000,
    
  })

  if (isLoading) {
    return <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span>maged</span>
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  }
  // console.log(data.data.data)
  // let [cat, setcat] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autospeed: 1000,

  };

  // function GetCat() {
  //   axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((data) => {
  //     console.log(data.data.data)
  //     setcat(data.data.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   GetCat()
  // }, [])
  return <div>
    <h1 className="bg-gray-200 p-2 m-3 mt-6 rounded-md"> Categories</h1>
    <Slider {...settings}>

      {data.map((c) => <div className='mb-5'>
        <img src={c.image} className='w-[100%] p-1 rounded-xl h-[200px] ' alt="" />
      </div>
      )}

    </Slider>
  </div>
}
