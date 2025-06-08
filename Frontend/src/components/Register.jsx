import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { useAuth } from '../context/authcontext'
import { useNavigate } from 'react-router-dom';






 
const Register = () => {
   const [message, setMessage] = useState("")
   const{registerUser, googleSignIn } = useAuth()
      const { register, handleSubmit } = useForm();
      const navigate = useNavigate()
      const onSubmit = async(data) => {
        console.log(data)
        try {
            await registerUser(data.email, data.password)
            alert("Registration successful")
        } catch (error) {
            console.log(error)
            setMessage("please provide a valid email and password.")
            
        }
    }
      const handleGoogleSignIn = async() => {
        try { 
            await googleSignIn();
            alert("Google Sign-in successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Google Sign-in failed.");
        }
      };
  return (
    <div>
      <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md'>
            <h2 className='text-xl font-semibold text-center mb-6'>Please Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input 
                      {...register("email", { required: true })}
                     type="email" name='email' id="email" placeholder='Email address' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input 
                        {...register("password", { required: true })}
                    type="password" name='password' id="password" placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    
                </div>
                {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full' type='submit'>
                        Register
                      
                    </button>
                </div>
            </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>
                 <div className="mt-4">
                     <button
                       onClick={handleGoogleSignIn}
                      className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                         <FaGoogle className='mr-2' />
                           Sign up with Google
                     </button>
                 </div>
                 <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>




        </div>
      
    </div>
    </div>
  )
}

export default Register
