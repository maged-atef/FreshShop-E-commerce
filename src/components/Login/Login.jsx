import { useFormik } from 'formik'
// import style from './Login.module.css'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'



// * ==> login 
export default function Login() {
  let {settoken} = useContext(UserContext)
  let go_to = useNavigate()
  
  let userLogin_info = {
    email: '',
    password: ''
  }
  //^ Custom Validateio
  // function validateData(info) {
  //   let error = {}
  //   if (info.email == "") {
  //     error.email = 'Email is Required'
  //   }

  //   if (info.password == "") {
  //     error.password = "Password is Required "
  //   }
  //   return error
  // }
  
  // ^Validate by yup 
  let validationSchema = yup.object().shape({
    email:yup.string().required("ادخل الايميل ").email("ادخل ايميل صحيح"),
    password: yup.string().min(6,"لازم علي الاقل 6 احرف ").required("ادخل الباسورد").max(10,"لا يزيد عن 10 احرف ")
  }); 
  // ^ SendData 
  async function sendData(info){ 
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',info)
    console.log(res)
    if(res.data.message == "success"){
      go_to('/')
      settoken(res.data.token)
      localStorage.setItem('UserToken', res.data.token)
      return
    }
   
  }
  // * Formik
  let input_data = useFormik({
    initialValues: userLogin_info,
    // Custom Validate
    // validate: validateData,

    // ^Special for yup
    validationSchema,
    onSubmit: sendData,
    
  })



  return <div>
    <h2 className='text-4xl font-extrabold text-emerald-800'> Login  </h2>
    <div className="div mt-4 border bottom-1 border-blue-400 w-[50%] mx-auto rounded-xl p-3 bg-green-300">
      <form className="max-w-sm mx-auto" onSubmit={input_data.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input name='email' value={input_data.values.email} onChange={input_data.handleChange} onBlur={input_data.handleBlur} required type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com"  />
          {input_data.errors.email && input_data.touched.email ? input_data.errors.email: '' }
        
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input name='password' value={input_data.values.password} onChange={input_data.handleChange} required onBlur={input_data.handleBlur} type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />
          {input_data.errors.password && input_data.touched.password? input_data.errors.password: '' }
          <NavLink to='/signup'><span>Register Now</span></NavLink>
        </div>

          
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>

  </div>
}