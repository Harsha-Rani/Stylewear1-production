import React, { useState,useEffect }  from 'react'
import Link from 'next/link'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';
const Login = () => {
  // const [name, setName]= useState();
  const router=useRouter()
  const [email, setEmail]= useState(''); 
  const [password, setPassword]= useState('');
  useEffect(() =>{
    const token = localStorage.getItem('myuser')
    if(token){
      router.push('/');
    }
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = {email,password}
    console.log("Harsha" ,process.env.HOST)
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
      method: 'POST',
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify(data),
    })
    let response =await res.json()
    console.log(response)
    setEmail('')
    setPassword('')
    if(response.success){
      localStorage.setItem('myuser',JSON.stringify({token:response.token, email: response.email}))
    toast.success('You are successfully logged in.', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      setTimeout(()=>{
        router.push(process.env.NEXT_PUBLIC_HOST)
      },1000)
      
    }
      else{
        toast.error(response.error, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
  }
  const handleChange=(e) =>{
    if(e.target.name =='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name =='password'){
      setPassword(e.target.value)
    }
  }
  return (
    <div className="bg-white rounded-lg py-0 -mt-16 -mb-10">
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
              <form method="POST" onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Log in to your Account</h3>
                <p className="mb-4 text-grey-700">Enter your email and password</p>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />

                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                <input value={email} onChange={handleChange} id="email" type="email" name="email" placeholder="mail@loopple.com" className="bg-slate-100 flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                <input id="password" onChange={handleChange} type="password" name="password" value={password} placeholder="Enter a password" className="bg-slate-100 flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <div className="flex flex-row justify-between mb-8">
                  
                  {/* <Link href={"/forgot"} className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</Link> */}
                </div>
                <button type="submit" className="bg-slate-500 flex justify-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none  mb-7  bg-grey-200 text-white rounded-lg">Login</button>
                <p className="text-sm leading-relaxed text-grey-900">Not registered yet? <a href={"/signup"} className="font-bold text-grey-700">Create an Account</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Login
