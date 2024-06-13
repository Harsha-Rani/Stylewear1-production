import React, { useState ,useEffect} from 'react'
import Link from 'next/link'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';

const SignUp = () => {
  const [name, setName]= useState('');
  const [email, setEmail]= useState(''); 
  const [password, setPassword]= useState('');
  const router=useRouter();
  useEffect(() =>{
    const token = localStorage.getItem('myuser')

    if(token){
      router.push('/');
    }
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = {name, email,password}
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
      method: 'POST',
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify(data),
    })
    let response =await res.json()
    // console.log(response)
    setEmail('')
    setName('')
    setPassword('')
    toast.success('Your account has been created.', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const handleChange=(e) =>{
    if(e.target.name =='name'){
      setName(e.target.value);
    }
    else if(e.target.name =='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name =='password'){
      setPassword(e.target.value)
    }
  }
  return (
    <div className="bg-white rounded-lg py-0 -mt-16 -mb-16">
      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" method="POST">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign up for an Account</h3>
                <p className="mb-4 text-grey-700">Enter your email and password</p>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Name</label>
                <input value={name} onChange={handleChange} id="name" name="name" type="text" placeholder="Enter Your Name" className="bg-slate-100 flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                <input value={email} onChange={handleChange} id="email" name="email" type="email" placeholder="mail@loopple.com" className="bg-slate-100 flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                <input value={password} onChange={handleChange} id="password" name="password" type="password" placeholder="Enter a password" className="bg-slate-100 flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <button type="submit" className="bg-slate-500 flex justify-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none  mb-7  bg-grey-200 text-white rounded-lg">Sign Up</button>
                <p className="text-sm leading-relaxed text-grey-900">Have an account? <Link href={"/login"} className="cursor-pointer font-bold text-grey-700">Sign In</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default SignUp
