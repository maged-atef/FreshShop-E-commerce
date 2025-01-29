import axios from 'axios';

import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { UserContext } from '../Context/UserContext';



export default function Signup() {
  let go_to = useNavigate()
  const [ApiError, setApiError] = useState("")
  let [isLoading, setisLoading] = useState(false)
  // let [token, settoken] = useState("")
  let { token, settoken } = useContext(UserContext)
  // & Axios Send Registeration info
  // async function Sing_up(values) {
  //   const res = await axios.post(Signup_link, values);
  //   console.log(res)
  //   if(res.data.message == 'success'){go_to('/login')}
  // }

  function Sing_up(values) {
    setisLoading(true)
    const Signup_link = 'https://ecommerce.routemisr.com/api/v1/auth/signup';
    axios.post(Signup_link, values).then((data) => {

      if (data.data.message == 'success' ) {
        settoken(data.data.token)
        localStorage.setItem('UserToken', data.data.token)
        setApiError(data.data.message)

        setisLoading(false)

        // settoken(data.data.token)
        alert(token)

        go_to('/login')
      }
    }).catch((erro) => {

      setApiError(erro.response.data.message)
      setisLoading(false)
    })
  }
  let info = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }
  const validationSchema = yup.object().shape({
    name: yup.string().min(3, "must > 3").max(10, "not >10"),
    email: yup.string().email().required(),
    password: yup.string().min(3, 'not <3').max(10, "not >10").required().matches(/^[A-Za-z0-9]{3,10}$/, 'enter 6-10 char'),
    rePassword: yup.string().oneOf([yup.ref("password")], "password doesn't match"),
    phone: yup.string().matches(/^01[125][0-9]{8}$/).required()
  })
  let formik = useFormik({
    initialValues: info,
    validationSchema,
    onSubmit: Sing_up
  })


  return <div>
    <h2 >Create New Account </h2>
    {ApiError ? <div className='alert p-2 m-2 bg-green-300 inline-block rounded-xl absolute top-0 right-4'>{ApiError}</div> : ''}
    <div className="">

      <form className="max-w-sm mx-auto w-[80%] bg-emerald-200 p-2 rounded-xl" onSubmit={formik.handleSubmit}>
        <div className="mb-1 ">
          <label htmlFor="name" className="block  text-sm font-medium text-gray-900 dark:text-white">name</label>
          <input type="text" name='name' value={formik.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
          {formik.errors.name && formik.touched.name ? formik.errors.name : ''}
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="block  text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' value={formik.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required />
          {formik.errors.email && formik.touched.email ? formik.errors.email : ''}
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="block  text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name='password' value={formik.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
          {formik.errors.password && formik.touched.password ? formik.errors.password : ''}
        </div>
        <div className="mb-1">
          <label htmlFor="repeat-password" className="block  text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
          <input type="password" name='rePassword' value={formik.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="repeat-password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
          {formik.errors.rePassword && formik.touched.rePassword ? formik.errors.rePassword : ''}

        </div>
        <div className="mb-1">
          <label htmlFor="phone" className="block  text-sm font-medium text-gray-900 dark:text-white">phone</label>
          <input type="text" name='phone' value={formik.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
          {formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}

        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700
         hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
         font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register new account'}
        </button>
      </form>


    </div>
  </div>
}
